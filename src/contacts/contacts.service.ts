import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactRequestDto } from './dto/request/create-contact.request.dto';
import { Client } from '../clients/entities/client.entity';
import { UpdateContactRequestDto } from './dto/request/update-contact.request.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  // Create contact
  async create(dto: CreateContactRequestDto) {
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
    updateContactDto: UpdateContactRequestDto,
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
