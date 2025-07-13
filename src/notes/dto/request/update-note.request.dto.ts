import { PartialType } from '@nestjs/swagger';
import { CreateNoteRequestDto } from './create-note.request.dto';

export class UpdateNoteRequestDto extends PartialType(CreateNoteRequestDto) {}
