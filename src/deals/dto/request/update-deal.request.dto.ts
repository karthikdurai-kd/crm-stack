import { PartialType } from '@nestjs/swagger';
import { CreateDealRequestDto } from './create-deal.request.dto';

export class UpdateDealRequestDto extends PartialType(CreateDealRequestDto) {}
