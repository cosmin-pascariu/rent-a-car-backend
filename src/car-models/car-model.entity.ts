import { Car } from 'src/cars/car.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('car_models')
export class CarModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'is_deleted', default: false }) // this is for DB
  isDeleted: boolean; // this is for the app

  @OneToMany(() => Car, (car) => car.model)
  cars: Car[];
}
