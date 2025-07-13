import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Deal } from 'src/deals/entities/deal.entity';
import { ClientSummaryDto } from './dto/client-summary.dto';
import { DealSummary } from './types';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,

    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,
  ) {}

  // create a client
  create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepo.create(createClientDto);
    return this.clientRepo.save(client);
  }

  // find all clients
  async findAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  // get client summary
  async getClientSummary(clientId: number): Promise<ClientSummaryDto> {
    const client = await this.clientRepo.findOne({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const { count, total }: DealSummary = (await this.dealRepo
      .createQueryBuilder('deal')
      .select('COUNT(deal.id)', 'count')
      .addSelect('SUM(deal.amount)', 'total')
      .where('deal.clientId = :clientId', { clientId })
      .getRawOne()) || { count: 0, total: 0 };

    const recentDeals = await this.dealRepo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
      take: 2,
    });

    return ClientSummaryDto.fromEntity(
      client,
      recentDeals,
      Number(count),
      Number(total),
    );
  }

  // Update client
  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepo.preload({
      id: id,
      ...updateClientDto,
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return this.clientRepo.save(client);
  }

  // Delete client
  async remove(id: number): Promise<void> {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    await this.clientRepo.remove(client);
  }
}
