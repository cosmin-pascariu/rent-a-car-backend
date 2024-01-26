import { Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  carId: string;

  @IsString()
  clientId: string;

  @IsString()
  startDate: Date;

  @IsString()
  endDate: Date;

  @IsString()
  totalPrice: number;

  @IsString()
  reservationStatus: string;
}

export class UpdateReservationDto {
  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}

export class ReservationDto {
  @Expose()
  id: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Expose()
  totalPrice: number;

  @Expose()
  reservationStatus: string;

  @Expose()
  @Transform(({ obj }) => obj.client.id)
  readonly clientId: string;

  @Expose()
  @Transform(({ obj }) => obj.car.id)
  readonly carId: string;
}

export class ReservationDetailsDto {
  @Expose()
  id: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Expose()
  totalPrice: number;

  @Expose()
  reservationStatus: string;
}
