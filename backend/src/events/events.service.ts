import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

export interface EventStatResponse {
  event: Event;
  ticketCount: number;
}

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event dengan id ${id} tidak ditemukan`);
    }
    Object.assign(event, dto);
    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event dengan id ${id} tidak ditemukan`);
    }
    await this.eventRepository.remove(event);
  }

  async findMostTickets(): Promise<EventStatResponse> {
    const result = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.tickets', 'ticket')
      .select('event')
      .addSelect('COUNT(ticket.id)', 'ticketCount')
      .groupBy('event.id')
      .orderBy('COUNT(ticket.id)', 'DESC')
      .getRawAndEntities();

    if (result.entities.length === 0) {
      throw new NotFoundException('Tidak ada event atau tiket di database');
    }

    const topEntity = result.entities[0];
    const topRaw = result.raw[0];
    return {
      event: topEntity,
      ticketCount: parseInt(topRaw.ticketCount, 10),
    };
  }

  async findLeastTickets(): Promise<EventStatResponse> {
    const result = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.tickets', 'ticket')
      .select('event')
      .addSelect('COUNT(ticket.id)', 'ticketCount')
      .groupBy('event.id')
      .orderBy('COUNT(ticket.id)', 'ASC')
      .getRawAndEntities();

    if (result.entities.length === 0) {
      throw new NotFoundException('Tidak ada event atau tiket di database');
    }

    const bottomEntity = result.entities[0];
    const bottomRaw = result.raw[0];
    return {
      event: bottomEntity,
      ticketCount: parseInt(bottomRaw.ticketCount, 10),
    };
  }
}
