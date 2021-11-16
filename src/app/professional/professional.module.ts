import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Speciality } from '~/app/professional/speciality/speciality.entity';
import { SubSpeciality } from '~/app/professional/sub-speciality/sub-speciality.entity';

import { SpecialityService } from '~/app/professional/speciality/speciality.service';
import { SubSpecialityService } from '~/app/professional/sub-speciality/sub-speciality.service';

import { SpecialityController } from '~/app/professional/speciality/speciality.controller';
import { SubSpecialityController } from '~/app/professional/sub-speciality/sub-speciality.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality, SubSpeciality])],
  providers: [SpecialityService, SubSpecialityService],
  controllers: [SpecialityController, SubSpecialityController],
})
export class ProfessionalModule {}
