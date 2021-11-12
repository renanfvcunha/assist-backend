import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClinicService } from '~/app/clinic/clinic.service';

import { ClinicController } from '~/app/clinic/clinic.controller';

import { Clinic } from '~/app/clinic/clinic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
})
export class ClinicModule {}
