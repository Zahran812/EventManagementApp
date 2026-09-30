import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ordererName: string;

  @Column({ nullable: false })
  ordererEmail: string;

  @Column()
  eventId: number;

  @ManyToOne('Event', 'tickets', { eager: false })
  @JoinColumn({ name: 'eventId' })
  event: any;

  @CreateDateColumn()
  createdAt: Date;
}