import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';
import { Note } from 'src/notes/entities/note.entity';

export class DealStageStat {
  @ApiProperty({ example: 'pending' })
  status: string;

  @ApiProperty({ example: 10 })
  count: number;
}

export class ClientInsightsDto {
  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: 'Apple Inc.' })
  companyName: string;

  @ApiProperty({ example: 10 })
  totalDeals: number;

  @ApiProperty({ example: 100000 })
  totalDealAmount: number;

  @ApiProperty({ example: '2021-01-01' })
  lastContactDate: string;

  @ApiProperty({ type: [String], example: ['Note 1', 'Note 2'] })
  recentNotes: string[];

  @ApiProperty({
    type: [DealStageStat],
    example: [
      { status: 'pending', count: 10 },
      { status: 'in_progress', count: 20 },
    ],
  })
  dealsByStage: DealStageStat[];

  static fromEntity(
    client: Client,
    dealSummary: { count: number; total: number },
    lastContactDate: Date | undefined,
    recentNotes: Note[],
    dealsByStage: { status: string; count: string | number }[],
  ): ClientInsightsDto {
    return {
      clientId: client.id,
      companyName: client.companyName,
      totalDeals: Number(dealSummary.count),
      totalDealAmount: Number(dealSummary.total),
      lastContactDate: lastContactDate?.toISOString() || '',
      recentNotes: recentNotes.map((n) => n.content),
      dealsByStage: dealsByStage.map((d) => ({
        status: d.status,
        count: Number(d.count),
      })),
    };
  }
}
