import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CarDetailsDto, CarDto, CreateCarDto, UpdateCarDto } from './cars.dtos';
import { plainToClass } from 'class-transformer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getAllCars() {
    // Cache
    const cacheKey = `cars`;
    let data: CarDto[] = await this.cacheManager.get(cacheKey);
    if (!data) {
      const cars = await this.carsRepository.find();
      data = cars.map(
        (
          car, // map to retrieve only the needed fields
        ) =>
          plainToClass(CarDto, car, {
            excludeExtraneousValues: true,
          }),
      );
      await this.cacheManager.set(cacheKey, data, 1000000);
    }

    return data;
  }

  async getCarById(id: string) {
    // cache
    const cacheKey = `cars-${id}`;
    let data: CarDetailsDto = await this.cacheManager.get(cacheKey);

    if (!data) {
      const car = await this.carsRepository.findOneBy({ id });
      data = plainToClass(CarDetailsDto, car, {
        excludeExtraneousValues: true,
      });
      await this.cacheManager.set(cacheKey, data, 1000000);
    }

    return data;
  }

  async createCar(car: CreateCarDto) {
    const dbCar = new Car();
    dbCar.make = car.make;
    dbCar.model = car.model;
    dbCar.year = car.year;
    dbCar.pricePerDay = car.pricePerDay;
    dbCar.availabilityStatus = car.availabilityStatus;
    dbCar.description = car.description;
    dbCar.owner = new User();
    dbCar.owner.id = car.ownerId;
    await this.invalidateCarsCache();

    const carData = await this.carsRepository.save(dbCar);
    console.log('CAR DATA', carData);
    return carData;
  }

  async updateCar(car: UpdateCarDto, carId: string) {
    await this.invalidateCarCache(carId);
    await this.invalidateCarsCache();
    return await this.carsRepository.update(carId, car);
  }

  async deleteCar(id: string) {
    await this.invalidateCarCache(id);
    await this.invalidateCarsCache();
    return await this.carsRepository.delete(id);
  }

  private async invalidateCarCache(id: string) {
    const cacheKey = `cars-${id}`;
    await this.cacheManager.del(cacheKey);
  }

  private async invalidateCarsCache() {
    const cacheKey = `cars`;
    await this.cacheManager.del(cacheKey);
  }
}
