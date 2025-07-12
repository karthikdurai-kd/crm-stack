import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  industry: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty()
  createdAt: Date;
}
