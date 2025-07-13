import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactRequestDto {
  @ApiProperty({ example: 'John Doe', description: 'Contact name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Contact email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+1 234567890',
    description: 'Contact phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsNumber()
  clientId: number;
}
