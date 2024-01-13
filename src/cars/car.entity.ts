import { Reservation } from 'src/reservations/reservation.entity';
import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('cars')
  export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ name: 'make' })
    make: string;
  
    @Column({ name: 'model' })
    model: string;

    @Column({ name: 'year' })
    year: string;

    @Column({ name: 'price_per_day' })
    pricePerDay: number;

    @Column({ name: 'availability_status' })
    availabilityStatus: string;

    @Column({ name: 'description' })
    description: string;

    @ManyToOne(() => User, (user) => user.cars)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @OneToMany(() => Review, (review) => review.car)
    reviews: Review[];

    @OneToMany(() => Reservation, (reservation)=> reservation.car)
    reservations: Reservation[];

}