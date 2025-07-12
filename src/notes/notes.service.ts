// src/notes/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { Deal } from 'src/deals/entities/deal.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,

    @InjectRepository(Deal)
    private dealRepo: Repository<Deal>,
  ) {}

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

  async findAll(dealId: number) {
    return this.noteRepo.find({
      where: { deal: { id: dealId } },
      order: { createdAt: 'DESC' },
    });
  }
}
