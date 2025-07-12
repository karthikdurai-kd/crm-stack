import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';
import { CreateDealDto } from './dto/create-deal.dto';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateDealDto) {
    const client = await this.clientRepo.findOneBy({ id: dto.clientId });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    const deal = this.dealRepo.create({
      ...dto,
      client,
    });
    return this.dealRepo.save(deal);
  }

  findAll() {
    return this.dealRepo.find({ relations: ['client'] });
  }
}
