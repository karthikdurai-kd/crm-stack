import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDealDto {
  @ApiProperty({ example: 'Deal 1', description: 'Deal title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 100000, description: 'Deal amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'pending', description: 'Deal status' })
  @IsString()
  status: string;

  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsNumber()
  clientId: number;
}
