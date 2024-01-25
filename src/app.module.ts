import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { CarModelsModule } from './car-models/car-models.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    CarsModule,
    CarModelsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
