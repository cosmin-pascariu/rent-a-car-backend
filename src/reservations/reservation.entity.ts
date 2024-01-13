import { Car } from 'src/cars/car.entity';
import { User } from 'src/users/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('reservations')
  export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ name: 'start_date' })
    startDate: Date;
  
    @CreateDateColumn({ name: 'end_date' })
    endDate: Date;

    @Column({ name: 'total_price' })
    totalPrice: number;

    @Column({ name: 'reservation_status' })
    reservationStatus: string;

    @ManyToOne(() => User, (user) => user.reservations)
    @JoinColumn({ name: 'client_id' })
    client: User;

    @ManyToOne(() => Car, (car) => car.reservations)
    @JoinColumn({ name: 'car_id' })
    car: Car;
  }