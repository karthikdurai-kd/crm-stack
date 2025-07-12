import { Controller, Post, Get, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'Contact created' })
  create(@Body() dto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all contacts' })
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
}
