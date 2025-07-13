import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [TypeOrmModule.forFeature([Client])],
})
export class AnalyticsModule {}
