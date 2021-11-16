import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ProfessionalService } from '~/app/professional/professional.service';

import { Professional } from '~/app/professional/professional.entity';

import { CreateProfessionalDto } from '~/app/professional/dto/createProfessional.dto';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Get()
  async index(): Promise<Professional[]> {
    return await this.professionalService.getProfessionals();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: CreateProfessionalDto): Promise<Professional> {
    return await this.professionalService.createProfessional(data);
  }
}
