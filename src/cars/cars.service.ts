import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Car)
    private readonly carsRepository: Repository<Car>,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find();
  }

    async getAllCars() {
        return await this.carsRepository.find();
    }

    async createCar(car: Car) {
        return await this.carsRepository.save(car);
      }

    async updateCar(car: Car) {
        return await this.carsRepository.update(car.id, car);
    }

    async getCarById(id: string) {
        try {
            const car = await this.carsRepository.findOneBy({id});
            if (!car) {
                // Handle the case where the user is not found
                // For example, throw a custom error or return null
                console.log('Car not found!');
            }
            return car;
        } catch (error) {
            // Handle any other errors that might occur
            // For example, log the error and throw a custom error
            console.log('GET CAR ERROR:',error);
        }
    }

    async deleteCar(id: string) {
        return await this.carsRepository.delete(id);
      }
}