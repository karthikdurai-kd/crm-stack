import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Client created' })
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all clients' })
  findAll() {
    return this.clientsService.findAll();
  }
}
