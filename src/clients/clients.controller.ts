import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ClientInsightsDto } from './dto/client-insights.dto';
import { UpdateClientDto } from './dto/update-client.dto';

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
  @ApiResponse({
    status: 200,
    description: 'Client summary with deals',
    type: ClientInsightsDto,
  })
  getSummary(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientInsightsDto> {
    return this.clientsService.getClientInsights(id);
  }

  // API: PATCH /clients/:id
  @Patch(':id')
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ status: 200, description: 'Client updated' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  // API: DELETE /clients/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Client deleted' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
