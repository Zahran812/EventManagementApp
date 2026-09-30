import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Route statis HARUS dideklarasikan sebelum route dinamis (:id)
  @Get('most-tickets')
  async getMostTickets() {
    return this.eventsService.findMostTickets();
  }

  @Get('least-tickets')
  async getLeastTickets() {
    return this.eventsService.findLeastTickets();
  }

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEventDto,
  ) {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.eventsService.remove(id);
    return { message: 'Event berhasil dihapus' };
  }
}
