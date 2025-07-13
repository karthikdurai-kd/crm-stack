import { ApiProperty } from '@nestjs/swagger';
import { Deal } from '../../deals/entities/deal.entity';
import { Client } from '../entities/client.entity';

export class ClientSummaryDto {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  totalDeals: number;

  @ApiProperty()
  totalDealAmount: number;

  @ApiProperty({ type: [Deal] })
  recentDeals: Deal[];

  static fromEntity(
    client: Client,
    recentDeals: Deal[],
    totalDeals: number,
    totalDealAmount: number,
  ): ClientSummaryDto {
    return {
      clientId: client.id,
      companyName: client.companyName,
      totalDeals,
      totalDealAmount,
      recentDeals,
    };
  }
}
