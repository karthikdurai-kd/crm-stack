import { IsNumber, IsOptional } from 'class-validator';

export class GetTopClientsQueryDto {
  @IsNumber()
  @IsOptional()
  minDeals: number;

  @IsNumber()
  @IsOptional()
  limit: number;
}
