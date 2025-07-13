import { ApiProperty } from '@nestjs/swagger';
import { TopClientRawData } from '../../types';

export class TopClientResponseDto {
  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: 'Apple Inc.' })
  companyName: string;

  @ApiProperty({ example: 10 })
  totalDeals: number;

  @ApiProperty({ example: 100000 })
  totalAmount: number;

  static fromEntity(rawData: TopClientRawData): TopClientResponseDto {
    return {
      clientId: rawData.id,
      companyName: rawData.companyName,
      totalDeals: Number(rawData.dealCount),
      totalAmount: Number(rawData.totalAmount) || 0,
    };
  }
}
