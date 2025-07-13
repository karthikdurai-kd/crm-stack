// src/notes/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { Deal } from 'src/deals/entities/deal.entity';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,

    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,
  ) {}

  // Create note
  async create(dto: CreateNoteDto) {
    const deal = await this.dealRepo.findOneBy({ id: dto.dealId });
    if (!deal) {
      throw new NotFoundException('Deal not found');
    }
    const note = this.noteRepo.create({
      content: dto.content,
      deal,
    });
    return this.noteRepo.save(note);
  }

  // Get all notes
  async findAll(dealId: number) {
    return this.noteRepo.find({
      where: { deal: { id: dealId } },
      order: { createdAt: 'DESC' },
    });
  }

  // Update note
  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepo.preload({
      id,
      ...updateNoteDto,
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return this.noteRepo.save(note);
  }

  // Delete note
  async remove(id: number): Promise<void> {
    const note = await this.noteRepo.findOne({ where: { id } });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    await this.noteRepo.remove(note);
  }
}
