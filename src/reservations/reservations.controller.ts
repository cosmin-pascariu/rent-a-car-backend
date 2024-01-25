import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './reservations.dtos';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() reservation: CreateReservationDto) {
    return await this.reservationsService.createReservation(reservation);
  }

  @Get()
  async getAllReservations() {
    return await this.reservationsService.getAllReservations();
  }

  @Get('/:id')
  async getReservationById(@Param('id') id: string) {
    return await this.reservationsService.getReservationById(id);
  }

  @Put('/:id')
  async updateReservation(
    @Body() reservation: UpdateReservationDto,
    @Param('id') id: string,
  ) {
    return await this.reservationsService.updateReservation(reservation, id);
  }

  @Delete('/:id')
  async deleteReservation(@Param('id') id: string) {
    return await this.reservationsService.deleteReservation(id);
  }
}
