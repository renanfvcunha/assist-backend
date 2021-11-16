import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ClinicDto } from '~/app/clinic/dto/clinic.dto';

import { ClinicService } from '~/app/clinic/clinic.service';

import { Clinic } from '~/app/clinic/clinic.entity';

import { uploadImage, imageFilter } from '~/config/uploadImage';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: ClinicDto): Promise<Clinic> {
    return await this.clinicService.createClinic(data);
  }

  @Patch(':id/logo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: uploadImage,
      fileFilter: imageFilter,
    }),
  )
  async updateLogo(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<Clinic> {
    return await this.clinicService.updateLogo(parseInt(id), file.filename);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() data: ClinicDto,
  ): Promise<Clinic> {
    return await this.clinicService.updateClinic(parseInt(id), data);
  }
}
