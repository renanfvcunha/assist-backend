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

import { SubSpeciality } from '~/app/professional/sub-speciality/sub-speciality.entity';

import { SubSpecialityService } from '~/app/professional/sub-speciality/sub-speciality.service';

import { SubSpecialityDto } from '~/app/professional/sub-speciality/dto/speciality.dto';

@Controller('sub-specialities')
export class SubSpecialityController {
  constructor(private readonly subSpecialityService: SubSpecialityService) {}

  @Get()
  async index(): Promise<SubSpeciality[]> {
    return await this.subSpecialityService.getSubSpecialities();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: SubSpecialityDto): Promise<SubSpeciality> {
    return await this.subSpecialityService.createSubSpeciality(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: SubSpecialityDto,
  ): Promise<SubSpeciality> {
    return await this.subSpecialityService.updateSubSpeciality(
      parseInt(id),
      data,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.subSpecialityService.deleteSubSpeciality(parseInt(id));
  }
}
