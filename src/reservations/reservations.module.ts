import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { User } from 'src/users/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { Car } from 'src/cars/car.entity';
import { CarsController } from 'src/cars/cars.controller';
import { CarsService } from 'src/cars/cars.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Car]),
    TypeOrmModule.forFeature([Reservation]),
    CacheModule.register(),
  ],
  controllers: [UsersController, CarsController, ReservationsController],
  providers: [UsersService, CarsService, ReservationsService],
})
export class ReservationsModule {}
