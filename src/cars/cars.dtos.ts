import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsString()
  year: string;

  @IsString()
  pricePerDay: number;

  @IsString()
  availabilityStatus: string;

  @IsString()
  description: string;

  @IsString()
  ownerId: string;
}

export class UpdateCarDto {
  @IsString()
  pricePerDay: number;

  @IsString()
  availabilityStatus: string;

  @IsString()
  description: string;
}

export class CarDto {
  @Expose()
  id: string;

  @Expose()
  model: string;

  @Expose()
  year: string;

  @Expose()
  pricePerDay: number;

  @Expose()
  availabilityStatus: string;
}

export class CarDetailsDto {
  @Expose()
  id: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: string;

  @Expose()
  pricePerDay: number;

  @Expose()
  availabilityStatus: string;

  @Expose()
  description: string;

  @Expose()
  ownerId: string;
}
