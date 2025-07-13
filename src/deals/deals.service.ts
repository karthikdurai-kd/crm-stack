import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Repository } from 'typeorm';
import { CreateDealDto } from './dto/create-deal.dto';
import { Client } from '../clients/entities/client.entity';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealFilterDto, SortOption } from './dto/deal-filter.dto';

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

  async findAllFiltered(filterDto: DealFilterDto): Promise<Deal[]> {
    const { status, minAmount, maxAmount, sort } = filterDto;

    const query = this.dealRepo.createQueryBuilder('deal');

    // Filter by status
    if (status) {
      query.andWhere('deal.status = :status', { status });
    }

    // Filter by min amount
    if (minAmount) {
      query.andWhere('deal.amount >= :minAmount', {
        minAmount: Number(minAmount),
      });
    }

    // Filter by max amount
    if (maxAmount) {
      query.andWhere('deal.amount <= :maxAmount', {
        maxAmount: Number(maxAmount),
      });
    }

    // Sort by amount or createdAt
    switch (sort) {
      case SortOption.AMOUNT_ASC:
        query.orderBy('deal.amount', 'ASC');
        break;
      case SortOption.AMOUNT_DESC:
        query.orderBy('deal.amount', 'DESC');
        break;
      case SortOption.CREATED_AT_ASC:
        query.orderBy('deal.createdAt', 'ASC');
        break;
      case SortOption.CREATED_AT_DESC:
        query.orderBy('deal.createdAt', 'DESC');
        break;
      default:
        query.orderBy('deal.createdAt', 'DESC');
    }

    return query.getMany();
  }
}
