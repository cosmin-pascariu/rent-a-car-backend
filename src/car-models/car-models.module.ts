import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModel } from './car-model.entity';
import { CarModelsController } from './car-models.controller';
import { CarModelsService } from './car-models.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarModel])],
  controllers: [CarModelsController],
  providers: [CarModelsService],
})
export class CarModelsModule {}
