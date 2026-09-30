import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity.js';
import { Event } from '../events/event.entity.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(eventName?: string): Promise<Ticket[]> {
    const qb = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.event', 'event');

    if (eventName && eventName.trim() !== '') {
      qb.where('LOWER(event.title) LIKE :eventName', {
        eventName: `%${eventName.toLowerCase()}%`,
      });
    }

    return qb.getMany();
  }

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const event = await this.eventRepository.findOne({
      where: { id: dto.eventId },
    });
    if (!event) {
      throw new NotFoundException(
        `Event dengan id ${dto.eventId} tidak ditemukan`,
      );
    }

    const ticket = this.ticketRepository.create(dto);
    return this.ticketRepository.save(ticket);
  }
}
