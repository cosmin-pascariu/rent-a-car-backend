import { Controller, Get, Post, Body, Render, Res, Param,  } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { CarsService } from './cars.service';
import { Car } from './car.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly usersService: UsersService, private readonly carsService: CarsService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Post()
  async createCar(@Body() car: Car, @Res() res: Response) {
    await this.carsService.createCar(car);
    res.redirect('/cars/view');
  }

  @Post('update')
  async updateCar(@Body() car: Car, @Res() res: Response) {
    await this.carsService.updateCar(car);
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
    return {users: users, message: 'Create car' };
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
}