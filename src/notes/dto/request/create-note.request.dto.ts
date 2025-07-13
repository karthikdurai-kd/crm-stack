import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteRequestDto {
  @ApiProperty({ example: 'This is a note', description: 'Note content' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1, description: 'Deal ID' })
  @IsNumber()
  dealId: number;
}
