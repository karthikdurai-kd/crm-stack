import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientRequestDto } from './dto/request/create-client.request.dto';
import { Deal } from 'src/deals/entities/deal.entity';
import { ClientInsightsDto } from './dto/response/client-insights.response.dto';
import { UpdateClientRequestDto } from './dto/request/update-client.request.dto';
import { Note } from 'src/notes/entities/note.entity';
import { DealStageStat, DealSummary } from './types';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,

    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,

    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  // create a client
  create(createClientDto: CreateClientRequestDto): Promise<Client> {
    const client = this.clientRepo.create(createClientDto);
    return this.clientRepo.save(client);
  }

  // find all clients
  async findAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  // get client insights
  async getClientInsights(clientId: number): Promise<ClientInsightsDto> {
    const client = await this.clientRepo.findOne({ where: { id: clientId } });
    if (!client)
      throw new NotFoundException(`Client with ID ${clientId} not found`);

    const { count, total }: DealSummary = (await this.dealRepo
      .createQueryBuilder('deal')
      .select('COUNT(deal.id)', 'count')
      .addSelect('SUM(deal.amount)', 'total')
      .where('deal.clientId = :clientId', { clientId })
      .getRawOne()) || { count: 0, total: 0 };

    const dealsByStage: DealStageStat[] = await this.dealRepo
      .createQueryBuilder('deal')
      .select('deal.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('deal.clientId = :clientId', { clientId })
      .groupBy('deal.status')
      .getRawMany();

    const lastContact = await this.noteRepo.findOne({
      where: { deal: { client: { id: clientId } } },
      order: { createdAt: 'DESC' },
    });

    const recentNotes = await this.noteRepo.find({
      where: { deal: { client: { id: clientId } } },
      order: { createdAt: 'DESC' },
      take: 2,
    });

    return ClientInsightsDto.fromEntity(
      client,
      { count, total },
      lastContact?.createdAt,
      recentNotes,
      dealsByStage,
    );
  }

  // Update client
  async update(
    id: number,
    updateClientDto: UpdateClientRequestDto,
  ): Promise<Client> {
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
