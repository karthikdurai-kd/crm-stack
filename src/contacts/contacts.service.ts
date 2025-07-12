import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateContactDto) {
    const client = await this.clientRepo.findOneBy({ id: dto.clientId });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const contact = this.contactRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      client: client,
    });

    return this.contactRepo.save(contact);
  }

  async findAll() {
    return this.contactRepo.find({ relations: ['client'] });
  }
}
