import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { Client } from '../clients/entities/client.entity';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  // Create contact
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

  // Get all contacts
  async findAll() {
    return this.contactRepo.find({ relations: ['client'] });
  }

  // Update contact
  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.contactRepo.preload({
      id,
      ...updateContactDto,
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return this.contactRepo.save(contact);
  }

  // Delete contact
  async remove(id: number): Promise<void> {
    const contact = await this.contactRepo.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    await this.contactRepo.remove(contact);
  }
}
