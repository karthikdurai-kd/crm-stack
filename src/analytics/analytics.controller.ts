import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { TopClientResponseDto } from './dto/response/top-client.response.dto';
import { GetTopClientsQueryDto } from './dto/query/get-top-clients.query.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('top-clients')
  @ApiQuery({
    type: GetTopClientsQueryDto,
    name: 'query',
    required: false,
    description: 'Query parameters',
  })
  @ApiResponse({
    status: 200,
    description: 'Top clients',
    type: [TopClientResponseDto],
  })
  async getTopClients(
    @Query() query: GetTopClientsQueryDto,
  ): Promise<TopClientResponseDto[]> {
    const { minDeals, limit } = query;
    return this.analyticsService.getTopClients(
      minDeals ?? 2, // default value
      limit ?? 5, // default value
    );
  }
}
