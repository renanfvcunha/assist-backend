import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactType } from '~/app/contact/contact-type/contact-type.entity';

import { ContactTypeService } from '~/app/contact/contact-type/contact-type.service';
import { ContactTypeController } from './contact-type/contact-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactType])],
  providers: [ContactTypeService],
  controllers: [ContactTypeController],
})
export class ContactModule {}
