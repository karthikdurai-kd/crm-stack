import { Body, Controller, Get, Post } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { Deal } from './entities/deal.entity';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  // API: POST /deals
  @Post()
  create(@Body() dto: CreateDealDto): Promise<Deal> {
    return this.dealsService.create(dto);
  }

  // API: GET /deals
  @Get()
  findAll(): Promise<Deal[]> {
    return this.dealsService.findAll();
  }
}
