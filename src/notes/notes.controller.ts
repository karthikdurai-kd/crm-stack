import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Note } from './entities/note.entity';

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
}
