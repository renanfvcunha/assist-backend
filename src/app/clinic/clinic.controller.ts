import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateClinicDto } from '~/app/clinic/dto/createClinic.dto';

import { ClinicService } from '~/app/clinic/clinic.service';

import { Clinic } from '~/app/clinic/clinic.entity';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: CreateClinicDto): Promise<Clinic> {
    return await this.clinicService.createClinic(data);
  }
}
