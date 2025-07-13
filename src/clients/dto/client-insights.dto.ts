import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';
import { Note } from 'src/notes/entities/note.entity';

export class DealStageStat {
  @ApiProperty()
  status: string;

  @ApiProperty()
  count: number;
}

export class ClientInsightsDto {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  totalDeals: number;

  @ApiProperty()
  totalDealAmount: number;

  @ApiProperty()
  lastContactDate: string;

  @ApiProperty({ type: [String] })
  recentNotes: string[];

  @ApiProperty({ type: [DealStageStat] })
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
