import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { SpecialityService } from '~/app/professional/speciality/speciality.service';

import { Speciality } from '~/app/professional/speciality/speciality.entity';

import { SpecialityDto } from '~/app/professional/dto/speciality.dto';

@Controller('specialities')
export class SpecialityController {
  constructor(private readonly specialityService: SpecialityService) {}

  @Get()
  async index(): Promise<Speciality[]> {
    return await this.specialityService.getSpecialities();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: SpecialityDto): Promise<Speciality> {
    return await this.specialityService.createSpeciality(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: SpecialityDto,
  ): Promise<Speciality> {
    return await this.specialityService.updateSpeciality(parseInt(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.specialityService.deleteSpeciality(parseInt(id));
  }
}
