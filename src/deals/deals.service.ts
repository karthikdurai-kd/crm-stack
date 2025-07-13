import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';
import { CreateDealDto } from './dto/create-deal.dto';
import { Client } from '../clients/entities/client.entity';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  // Create deal
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

  // Get all deals
  findAll() {
    return this.dealRepo.find({ relations: ['client'] });
  }

  // Update deal
  async update(id: number, updateDealDto: UpdateDealDto): Promise<Deal> {
    const deal = await this.dealRepo.preload({
      id: id,
      ...updateDealDto,
    });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    return this.dealRepo.save(deal);
  }

  // Delete deal
  async remove(id: number): Promise<void> {
    const deal = await this.dealRepo.findOne({ where: { id } });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    await this.dealRepo.remove(deal);
  }
}
