import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Apple Inc.' })
  companyName: string;

  @ApiProperty({ example: 'Technology' })
  industry: string;

  @ApiProperty({ example: 'Cupertino', required: false })
  city?: string;

  @ApiProperty({ example: '2021-01-01' })
  createdAt: Date;
}
