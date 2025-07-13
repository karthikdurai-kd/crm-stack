import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteRequestDto } from './dto/request/create-note.request.dto';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import { UpdateNoteRequestDto } from './dto/request/update-note.request.dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // API: POST /notes
  @Post()
  @ApiBody({ type: CreateNoteRequestDto })
  @ApiResponse({ status: 201, description: 'Note created' })
  create(@Body() dto: CreateNoteRequestDto): Promise<Note> {
    return this.notesService.create(dto);
  }

  // API: GET /notes?dealId=1
  @Get()
  @ApiQuery({ name: 'dealId', type: Number })
  @ApiResponse({ status: 200, description: 'List notes for a deal' })
  findAll(@Query('dealId') dealId: number): Promise<Note[]> {
    return this.notesService.findAll(dealId);
  }

  // API: PATCH /notes/:id
  @Patch(':id')
  @ApiBody({ type: UpdateNoteRequestDto })
  @ApiResponse({ status: 200, description: 'Note updated' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteRequestDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  // API: DELETE /notes/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Note deleted' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
