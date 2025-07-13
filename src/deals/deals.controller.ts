import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { Deal } from './entities/deal.entity';
import { UpdateDealDto } from './dto/update-deal.dto';

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

  // API: PATCH /deals/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealsService.update(+id, updateDealDto);
  }

  // API: DELETE /deals/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealsService.remove(+id);
  }
}
