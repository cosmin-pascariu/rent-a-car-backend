import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { CarModelsModule } from './car-models/car-models.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './utils/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LoggingModule,
    UsersModule,
    AuthModule,
    CarsModule,
    CarModelsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
