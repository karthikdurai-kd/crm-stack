import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealRequestDto } from './dto/request/create-deal.request.dto';
import { Deal } from './entities/deal.entity';
import { UpdateDealRequestDto } from './dto/request/update-deal.request.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DealFilterQueryDto } from './dto/query/deal-filter.query.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  // API: POST /deals
  @Post()
  @ApiBody({ type: CreateDealRequestDto })
  @ApiResponse({ status: 201, description: 'Deal created' })
  create(@Body() dto: CreateDealRequestDto): Promise<Deal> {
    return this.dealsService.create(dto);
  }

  // API: GET /deals
  @Get()
  @ApiResponse({ status: 200, description: 'List all deals' })
  findAll(): Promise<Deal[]> {
    return this.dealsService.findAll();
  }

  // API: PATCH /deals/:id
  @Patch(':id')
  @ApiBody({ type: UpdateDealRequestDto })
  @ApiResponse({ status: 200, description: 'Deal updated' })
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealRequestDto) {
    return this.dealsService.update(+id, updateDealDto);
  }

  // API: DELETE /deals/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deal deleted' })
  remove(@Param('id') id: string) {
    return this.dealsService.remove(+id);
  }

  @Get('filter')
  @ApiQuery({ type: DealFilterQueryDto })
  @ApiResponse({ status: 200, description: 'List all deals filtered' })
  findAllFiltered(@Query() filterDto: DealFilterQueryDto): Promise<Deal[]> {
    return this.dealsService.findAllFiltered(filterDto);
  }
}
