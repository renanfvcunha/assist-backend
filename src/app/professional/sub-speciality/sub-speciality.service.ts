import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';

import { SubSpeciality } from '~/app/professional/sub-speciality/sub-speciality.entity';
import { Speciality } from '~/app/professional/speciality/speciality.entity';

import { SubSpecialityDto } from '~/app/professional/dto/subSpeciality.dto';

@Injectable()
export class SubSpecialityService {
  constructor(
    @InjectRepository(SubSpeciality)
    private readonly subSpecialityRepository: Repository<SubSpeciality>,
  ) {}

  async getSubSpecialities(): Promise<SubSpeciality[]> {
    return await this.subSpecialityRepository.find();
  }

  async createSubSpeciality(data: SubSpecialityDto): Promise<SubSpeciality> {
    const speciality = new Speciality();
    speciality.id = data.id_speciality;

    const subSpecialityFound = await this.subSpecialityRepository.findOne({
      where: { name: data.name, speciality },
    });

    if (subSpecialityFound) {
      throw new UnprocessableEntityException(
        'Já existe uma sub-especialidade com o nome informado!',
      );
    }

    const subSpeciality = this.subSpecialityRepository.create(data);
    subSpeciality.speciality = speciality;

    return await this.subSpecialityRepository.save(subSpeciality);
  }

  private async findSubSpeciality(id: number): Promise<SubSpeciality> {
    const subSpeciality = await this.subSpecialityRepository.findOne(id);

    if (!subSpeciality)
      throw new NotFoundException('Sub-especialidade não encontrada!');

    return subSpeciality;
  }

  async updateSubSpeciality(
    id: number,
    data: SubSpecialityDto,
  ): Promise<SubSpeciality> {
    const subSpeciality = await this.findSubSpeciality(id);

    const speciality = new Speciality();
    speciality.id = data.id_speciality;

    const subSpecialityFound = await this.subSpecialityRepository.findOne({
      where: { name: data.name, speciality, id: Not(id) },
    });

    if (subSpecialityFound) {
      throw new UnprocessableEntityException(
        'Já existe uma especialidade com o nome informado!',
      );
    }

    subSpeciality.name = data.name;
    subSpeciality.speciality = speciality;

    return await this.subSpecialityRepository.save(subSpeciality);
  }

  async deleteSubSpeciality(id: number): Promise<DeleteResult> {
    const subSpeciality = await this.findSubSpeciality(id);

    return await this.subSpecialityRepository.delete(subSpeciality);
  }
}
