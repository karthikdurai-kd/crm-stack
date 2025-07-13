import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Note } from '../../notes/entities/note.entity';
import { DealStatus } from '../../shared/types';
import { IsEnum } from 'class-validator';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: DealStatus })
  @IsEnum(DealStatus)
  status: DealStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Client, (client) => client.deals, { onDelete: 'CASCADE' })
  client: Client;

  @OneToMany(() => Note, (note) => note.deal)
  notes: Note[];
}
