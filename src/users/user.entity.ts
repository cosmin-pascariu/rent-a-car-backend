import { Car } from 'src/cars/car.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { Review } from 'src/reviews/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'user_type' })
  userType: string;

  @Column({ name: 'contact_number' })
  contactNumber: string;

  @OneToMany(() => Car, (car) => car.owner) //DONE
  cars: Car[];

  @OneToMany(() => Reservation, (reservation) => reservation.client) //DONE
  reservations: Reservation[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];
}
