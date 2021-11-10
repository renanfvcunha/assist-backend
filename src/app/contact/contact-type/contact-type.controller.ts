import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ContactTypeService } from '~/app/contact/contact-type/contact-type.service';

import { ContactType } from '~/app/contact/contact-type/contact-type.entity';

import { ContactTypeDto } from '~/app/contact/dto/contact-type.dto';

@Controller('contacts/contact-types')
export class ContactTypeController {
  constructor(private readonly contactTypeService: ContactTypeService) {}

  @Get()
  async index(): Promise<ContactType[]> {
    return await this.contactTypeService.getContactTypes();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: ContactTypeDto): Promise<ContactType> {
    return await this.contactTypeService.createContactType(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: ContactTypeDto,
  ): Promise<ContactType> {
    return await this.contactTypeService.updateContactType(parseInt(id), data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.contactTypeService.deleteContactType(parseInt(id));
  }
}
