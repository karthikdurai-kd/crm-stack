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
import { CreateContactRequestDto } from './dto/request/create-contact.request.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';
import { UpdateContactRequestDto } from './dto/request/update-contact.request.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // API: POST /contacts
  @Post()
  @ApiBody({ type: CreateContactRequestDto })
  @ApiResponse({ status: 201, description: 'Contact created' })
  create(@Body() dto: CreateContactRequestDto): Promise<Contact> {
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
  @ApiBody({ type: UpdateContactRequestDto })
  @ApiResponse({ status: 200, description: 'Contact updated' })
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactRequestDto,
  ) {
    return this.contactsService.update(+id, updateContactDto);
  }

  // API: DELETE /contacts/:id
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Contact deleted' })
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
