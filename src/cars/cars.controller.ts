import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Res,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './cars.dtos';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly carsService: CarsService,
  ) {}

  // For MVC
  @Post()
  async createCar(@Body() car: CreateCarDto, @Res() res: Response) {
    await this.carsService.createCar(car);
    res.redirect('/cars/view');
  }

  @Post('update/:id')
  async updateCar(
    @Body() car: UpdateCarDto,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.carsService.updateCar(car, id);
    res.redirect('/cars/view');
  }

  @Get('view')
  @Render('cars-home') /// toate metodele render returneaza un html, restul sunt json
  async getCarsView() {
    const users = await this.usersService.getAllUsers();
    const cars = await this.carsService.getAllCars();
    return { users: users, cars: cars, message: 'Cars page' };
  }

  @Get('create')
  @Render('create-car')
  async reateCarsView() {
    const users = await this.usersService.getAllUsers();
    return { users: users, message: 'Create car' };
  }

  @Get('update/:id')
  @Render('update-car')
  async updateCarsView(@Param('id') id: string) {
    const car = await this.carsService.getCarById(id);
    const users = await this.usersService.getAllUsers();
    return { users: users, car: car, message: 'Edit user' };
  }

  @Get('delete/:id')
  async deleteCar(@Param('id') id: string, @Res() res: Response) {
    await this.carsService.deleteCar(id);
    res.redirect('/cars/view');
  }

  // For API
  @Get()
  async getAllCars() {
    return await this.carsService.getAllCars();
  }

  @Get(':id/details')
  async getCarById(@Param('id') id: string) {
    return await this.carsService.getCarById(id);
  }

  @Post('/create')
  async createCarAPI(@Body() car: CreateCarDto) {
    return await this.carsService.createCar(car);
  }

  @Put(':id/update')
  async updateCarAPI(@Body() car: UpdateCarDto, @Param('id') id: string) {
    return await this.carsService.updateCar(car, id);
  }

  @Delete(':id/delete')
  async deleteCarAPI(@Param('id') id: string) {
    return await this.carsService.deleteCar(id);
  }
}
