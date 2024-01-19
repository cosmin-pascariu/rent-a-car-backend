import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CarModelsService } from './car-models.service';

@Controller('car-models')
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @Get()
  async getAllCarModels() {
    return await this.carModelsService.getAllCarModels();
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return await this.carModelsService.softDelete(id);
  }
}
