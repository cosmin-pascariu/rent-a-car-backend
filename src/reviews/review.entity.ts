import { Car } from 'src/cars/car.entity';
import { User } from 'src/users/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('reviews')
  export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'car_id', unique: true })
    carId: string;
  
    @Column({ name: 'rating' })
    rating: number;
  
    @Column({ name: 'comment'})
    coment: string;

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({ name: 'reviewer_id' })
    reviewer: User;

    @ManyToOne(() => Car, (car) => car.reviews)
    @JoinColumn({ name: 'car_id' })
    car: Car;
  }