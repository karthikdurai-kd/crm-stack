import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ClientSummaryDto } from './dto/client-summary.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // API: POST /clients
  @Post()
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Client created' })
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  // API: GET /clients
  @Get()
  @ApiResponse({ status: 200, description: 'List all clients' })
  findAll() {
    return this.clientsService.findAll();
  }

  // API: GET /clients/:id/summary
  @Get(':id/summary')
  @ApiResponse({ status: 200, description: 'Client summary with deals' })
  getSummary(@Param('id', ParseIntPipe) id: number): Promise<ClientSummaryDto> {
    return this.clientsService.getClientSummary(id);
  }
}
