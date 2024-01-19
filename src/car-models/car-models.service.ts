import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarModel } from './car-model.entity';

@Injectable()
export class CarModelsService {
  constructor(
    @InjectRepository(CarModel)
    private readonly carModelsRepository: Repository<CarModel>,
  ) {}

  async getAllCarModels() {
    return await this.carModelsRepository.find({
      select: ['id', 'name'],
      where: { isDeleted: false },
    });
  }

  async softDelete(id: string) {
    return await this.carModelsRepository.update(id, { isDeleted: true });
  }
}
