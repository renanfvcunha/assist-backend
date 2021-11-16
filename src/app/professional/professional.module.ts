import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Speciality } from '~/app/professional/speciality/speciality.entity';
import { SubSpeciality } from '~/app/professional/sub-speciality/sub-speciality.entity';
import { Professional } from '~/app/professional/professional.entity';

import { SpecialityService } from '~/app/professional/speciality/speciality.service';
import { SubSpecialityService } from '~/app/professional/sub-speciality/sub-speciality.service';
import { ProfessionalService } from '~/app/professional/professional.service';

import { SpecialityController } from '~/app/professional/speciality/speciality.controller';
import { SubSpecialityController } from '~/app/professional/sub-speciality/sub-speciality.controller';
import { ProfessionalController } from '~/app/professional/professional.controller';

import { UserModule } from '~/app/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Speciality, SubSpeciality, Professional]),
    UserModule,
  ],
  providers: [SpecialityService, SubSpecialityService, ProfessionalService],
  controllers: [
    SpecialityController,
    SubSpecialityController,
    ProfessionalController,
  ],
})
export class ProfessionalModule {}
