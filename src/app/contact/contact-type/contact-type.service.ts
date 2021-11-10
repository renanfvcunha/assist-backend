import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { ContactType } from '~/app/contact/contact-type/contact-type.entity';

import { ContactTypeDto } from '~/app/contact/dto/contact-type.dto';

@Injectable()
export class ContactTypeService {
  constructor(
    @InjectRepository(ContactType)
    private readonly contactTypeRepository: Repository<ContactType>,
  ) {}

  async getContactTypes(): Promise<ContactType[]> {
    return await this.contactTypeRepository.find();
  }

  async createContactType(data: ContactTypeDto): Promise<ContactType> {
    const contactType = this.contactTypeRepository.create(data);

    return await this.contactTypeRepository.save(contactType);
  }

  private async findContactType(id: number): Promise<ContactType> {
    const contactType = await this.contactTypeRepository.findOne(id);

    if (!contactType)
      throw new NotFoundException('Tipo de contato não encontrado!');

    return contactType;
  }

  async updateContactType(
    id: number,
    data: ContactTypeDto,
  ): Promise<ContactType> {
    const contactType = await this.findContactType(id);

    contactType.name = data.name;

    return await this.contactTypeRepository.save(contactType);
  }

  async deleteContactType(id: number): Promise<DeleteResult> {
    const contactType = await this.findContactType(id);

    return await this.contactTypeRepository.delete(contactType);
  }
}
