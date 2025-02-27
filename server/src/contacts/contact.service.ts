import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService extends BaseService<Contact> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {
    super(contactRepository);
  }

  async searchContacts(query: string, sortField: string): Promise<Contact[]> {
    return this.contactRepository
      .createQueryBuilder('contact')
      .where('contact.name ILIKE :query', { query: `%${query}%` })
      .orWhere('contact.email ILIKE :query', { query: `%${query}%` })
      .orderBy(`contact.${sortField}`, 'ASC')
      .getMany();
  }
}
