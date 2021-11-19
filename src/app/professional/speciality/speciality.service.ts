import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';

import { Speciality } from '~/app/professional/speciality/speciality.entity';

import { SpecialityDto } from '~/app/professional/dto/speciality.dto';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>,
  ) {}

  async getSpecialities(): Promise<Speciality[]> {
    return await this.specialityRepository.find();
  }

  async createSpeciality(data: SpecialityDto): Promise<Speciality> {
    const specialityFound = await this.specialityRepository.findOne({
      where: { name: data.name },
    });

    if (specialityFound) {
      throw new UnprocessableEntityException(
        'Já existe uma especialidade com o nome informado!',
      );
    }

    const speciality = this.specialityRepository.create(data);

    return await this.specialityRepository.save(speciality);
  }

  private async findSpeciality(id: number): Promise<Speciality> {
    const speciality = await this.specialityRepository.findOne(id);

    if (!speciality)
      throw new NotFoundException('Especialidade não encontrada!');

    return speciality;
  }

  async updateSpeciality(id: number, data: SpecialityDto): Promise<Speciality> {
    const speciality = await this.findSpeciality(id);

    const specialityFound = await this.specialityRepository.findOne({
      where: { name: data.name, id: Not(id) },
    });

    if (specialityFound) {
      throw new UnprocessableEntityException(
        'Já existe uma especialidade com o nome informado!',
      );
    }

    speciality.name = data.name;

    return await this.specialityRepository.save(speciality);
  }

  async deleteSpeciality(id: number): Promise<DeleteResult> {
    const speciality = await this.findSpeciality(id);

    return await this.specialityRepository.delete(speciality);
  }
}
