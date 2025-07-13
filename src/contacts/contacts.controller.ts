import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // API: POST /contacts
  @Post()
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'Contact created' })
  create(@Body() dto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(dto);
  }

  // API: GET /contacts
  @Get()
  @ApiResponse({ status: 200, description: 'List all contacts' })
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  // API: PATCH /contacts/:id
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Contact updated' })
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  // API: DELETE /contacts/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Contact deleted' })
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
