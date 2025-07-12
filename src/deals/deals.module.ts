import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { Client } from '../clients/entities/client.entity';

@Module({
  providers: [DealsService],
  controllers: [DealsController],
  imports: [TypeOrmModule.forFeature([Deal, Client])],
})
export class DealsModule {}
