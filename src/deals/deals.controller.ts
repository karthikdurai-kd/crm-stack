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
import { CreateDealDto } from './dto/create-deal.dto';
import { Deal } from './entities/deal.entity';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DealFilterDto } from './dto/deal-filter.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  // API: POST /deals
  @Post()
  @ApiBody({ type: CreateDealDto })
  @ApiResponse({ status: 201, description: 'Deal created' })
  create(@Body() dto: CreateDealDto): Promise<Deal> {
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
  @ApiBody({ type: UpdateDealDto })
  @ApiResponse({ status: 200, description: 'Deal updated' })
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealsService.update(+id, updateDealDto);
  }

  // API: DELETE /deals/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deal deleted' })
  remove(@Param('id') id: string) {
    return this.dealsService.remove(+id);
  }

  @Get('filter')
  @ApiQuery({ type: DealFilterDto })
  @ApiResponse({ status: 200, description: 'List all deals filtered' })
  findAllFiltered(@Query() filterDto: DealFilterDto): Promise<Deal[]> {
    return this.dealsService.findAllFiltered(filterDto);
  }
}
