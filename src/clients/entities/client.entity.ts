import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Deal } from '../../deals/entities/deal.entity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  industry: string;

  @Column({ nullable: true })
  city: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Deal, (deal) => deal.client)
  deals: Deal[];

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];
}
