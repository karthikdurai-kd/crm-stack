import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { Client } from '../clients/entities/client.entity';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [TypeOrmModule.forFeature([Contact, Client])],
})
export class ContactsModule {}
