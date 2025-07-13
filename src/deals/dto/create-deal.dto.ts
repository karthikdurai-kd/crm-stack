import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DealStatus } from '../../shared/types';

export class CreateDealDto {
  @ApiProperty({ example: 'Deal 1', description: 'Deal title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 100000, description: 'Deal amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: DealStatus.PENDING,
    description: 'Deal status',
    enum: DealStatus,
  })
  @IsEnum(DealStatus, {
    message: `Status must be one of: ${Object.values(DealStatus).join(', ')}`,
  })
  status: DealStatus;

  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsNumber()
  clientId: number;
}
