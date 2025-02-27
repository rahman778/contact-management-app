import { Controller, Get, Query } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactController extends BaseController<
  Contact,
  CreateContactDto,
  UpdateContactDto
> {
  constructor(private readonly contactService: ContactService) {
    super(contactService, CreateContactDto, UpdateContactDto);
  }

  @Get('search')
  async searchContacts(
    @Query('query') query: string,
    @Query('sortField') sortField: string,
  ): Promise<Contact[]> {
    return this.contactService.searchContacts(query, sortField);
  }
}
