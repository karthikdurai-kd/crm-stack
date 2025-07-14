import { ApiProperty } from '@nestjs/swagger';

export class ClientMonthlyRevenueResponseDto {
  @ApiProperty({ example: '2024-07' })
  month: string;

  @ApiProperty({ example: 100000 })
  totalRevenue: number;
}
