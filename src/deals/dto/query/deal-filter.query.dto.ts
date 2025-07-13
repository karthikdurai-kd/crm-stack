import { IsOptional, IsNumberString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DealStatus } from '../../../shared/types';

export enum SortOption {
  AMOUNT_ASC = 'amount_asc',
  AMOUNT_DESC = 'amount_desc',
  CREATED_AT_ASC = 'createdAt_asc',
  CREATED_AT_DESC = 'createdAt_desc',
}

export class DealFilterQueryDto {
  @ApiPropertyOptional({
    enum: DealStatus,
    example: DealStatus.PENDING,
  })
  @IsEnum(DealStatus, {
    message: `Status must be one of: ${Object.values(DealStatus).join(', ')}`,
  })
  @IsOptional()
  status?: DealStatus;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @IsNumberString()
  minAmount?: string;

  @ApiPropertyOptional({ example: 1000000 })
  @IsOptional()
  @IsNumberString()
  maxAmount?: string;

  @ApiPropertyOptional({
    enum: SortOption,
    example: SortOption.AMOUNT_ASC,
  })
  @IsEnum(SortOption, {
    message: `Sort must be one of: ${Object.values(SortOption).join(', ')}`,
  })
  @IsOptional()
  sort?: SortOption;
}
