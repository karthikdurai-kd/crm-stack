import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateClientRequestDto {
  @ApiProperty({
    example: 'Apple Inc.',
    description: 'Name of the client company',
  })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'Technology', description: 'Client industry sector' })
  @IsString()
  industry: string;

  @ApiProperty({ example: 'Cupertino', required: false })
  @IsOptional()
  @IsString()
  city?: string;
}
