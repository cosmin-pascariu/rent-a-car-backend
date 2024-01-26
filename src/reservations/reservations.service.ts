import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Car } from 'src/cars/car.entity';
import { Repository } from 'typeorm';

import { plainToClass } from 'class-transformer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Reservation } from 'src/reservations/reservation.entity';
import {
  CreateReservationDto,
  ReservationDetailsDto,
  ReservationDto,
  UpdateReservationDto,
} from 'src/reservations/reservations.dtos';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getAllReservations() {
    const cacheKey = `reservations`;
    let data: ReservationDto[] = await this.cacheManager.get(cacheKey);
    if (!data) {
      const reservations = await this.reservationsRepository.find({
        relations: ['client', 'car'],
      });
      console.log('reservations', reservations);
      data = reservations.map((reservation) =>
        plainToClass(ReservationDto, reservation, {
          excludeExtraneousValues: true,
        }),
      );
      await this.cacheManager.set(cacheKey, data, 1000000);
    }

    return data;
  }

  async getReservationById(id: string) {
    const cacheKey = `reservations-${id}`;
    let data: ReservationDetailsDto = await this.cacheManager.get(cacheKey);

    if (!data) {
      const reservation = await this.reservationsRepository.findOneBy({ id });
      data = plainToClass(ReservationDetailsDto, reservation, {
        excludeExtraneousValues: true,
      });
      await this.cacheManager.set(cacheKey, data, 1000000);
    }

    return data;
  }

  async createReservation(reservation: CreateReservationDto) {
    const user = new User();
    user.id = reservation.clientId;

    const car = new Car();
    car.id = reservation.carId;

    const dbReservation = new Reservation();
    dbReservation.startDate = reservation.startDate;
    dbReservation.endDate = reservation.endDate;
    dbReservation.totalPrice = reservation.totalPrice;
    dbReservation.reservationStatus = reservation.reservationStatus;
    dbReservation.client = user;
    dbReservation.car = car;
    await this.invalidateReservationsCache();

    const reservationData =
      await this.reservationsRepository.save(dbReservation);
    console.log('reservationData', reservationData);
    return reservationData;
  }

  async updateReservation(reservation: UpdateReservationDto, id: string) {
    await this.invalidateReservationsCache(id);
    await this.invalidateReservationsCache();
    return await this.reservationsRepository.update(id, reservation);
  }

  async deleteReservation(id: string) {
    await this.invalidateReservationsCache(id);
    await this.invalidateReservationsCache();
    return await this.reservationsRepository.delete(id);
  }

  private async invalidateReservationsCache(id?: string) {
    const cacheKey = id ? `reservations-${id}` : `reservations`;
    await this.cacheManager.del(cacheKey);
  }

  // function for calculating the penalty for a reservation
  async calculatePenalty(reservation: Reservation) {
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    const today = new Date();

    // if the reservation has already started
    if (today >= startDate) {
      // if the reservation has already ended
      if (today >= endDate) {
        // if the reservation has already ended and the client has returned the car
        if (reservation.reservationStatus === 'returned') {
          return 0;
        }
        // if the reservation has already ended and the client has not returned the car
        else {
          const penalty = (today.getTime() - endDate.getTime()) / 86400000;
          return penalty;
        }
      }
      // if the reservation has not ended yet
      else {
        const penalty = (today.getTime() - startDate.getTime()) / 86400000;
        return penalty;
      }
    }
    // if the reservation has not started yet
    else {
      return 0;
    }
  }
}
