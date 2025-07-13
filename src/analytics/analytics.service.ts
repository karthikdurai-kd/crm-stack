import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { TopClientResponseDto } from './dto/response/top-client.response.dto';
import { TopClientRawData } from './types';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async getTopClients(
    minDeals: number,
    limit: number,
  ): Promise<TopClientResponseDto[]> {
    const results: TopClientRawData[] = await this.clientRepo
      .createQueryBuilder('client')
      .leftJoin('client.deals', 'deal')
      .select('client.id', 'id')
      .addSelect('client.companyName', 'companyName')
      .addSelect('COUNT(deal.id)', 'dealCount')
      .addSelect('SUM(deal.amount)', 'totalAmount')
      .groupBy('client.id')
      .having('COUNT(deal.id) >= :minDeals', { minDeals })
      .orderBy('SUM(deal.amount)', 'DESC')
      .limit(limit)
      .getRawMany();

    return results.map((row) => TopClientResponseDto.fromEntity(row));
  }
}
