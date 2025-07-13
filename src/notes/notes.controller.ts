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
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Note } from './entities/note.entity';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // API: POST /notes
  @Post()
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'Note created' })
  create(@Body() dto: CreateNoteDto): Promise<Note> {
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
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: 'Note updated' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  // API: DELETE /notes/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Note deleted' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
