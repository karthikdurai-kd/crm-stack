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
import { CreateClientRequestDto } from './dto/request/create-client.request.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ClientInsightsDto } from './dto/response/client-insights.response.dto';
import { UpdateClientRequestDto } from './dto/request/update-client.request.dto';
import { ClientMonthlyRevenueResponseDto } from './dto/response/client-monthly-revenue-response.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // API: POST /clients
  @Post()
  @ApiBody({ type: CreateClientRequestDto })
  @ApiResponse({ status: 201, description: 'Client created' })
  create(@Body() dto: CreateClientRequestDto) {
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
  @ApiBody({ type: UpdateClientRequestDto })
  @ApiResponse({ status: 200, description: 'Client updated' })
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientRequestDto,
  ) {
    return this.clientsService.update(+id, updateClientDto);
  }

  // API: DELETE /clients/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Client deleted' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }

  // API: GET /clients/:id/monthly-revenue
  @Get(':id/monthly-revenue')
  @ApiResponse({
    status: 200,
    type: [ClientMonthlyRevenueResponseDto],
  })
  getClientMonthlyRevenue(
    @Param('id', ParseIntPipe) clientId: number,
  ): Promise<ClientMonthlyRevenueResponseDto[]> {
    return this.clientsService.getClientMonthlyRevenue(clientId);
  }
}
