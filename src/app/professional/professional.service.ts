import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Professional } from '~/app/professional/professional.entity';
import { Speciality } from './speciality/speciality.entity';
import { SubSpeciality } from './sub-speciality/sub-speciality.entity';
import { User } from '../user/user.entity';

import { CreateProfessionalDto } from '~/app/professional/dto/createProfessional.dto';

import { UserService } from '~/app/user/user.service';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    private readonly userService: UserService,
  ) {}

  async getProfessionals(): Promise<Professional[]> {
    return await this.professionalRepository.find({
      relations: ['user', 'speciality', 'subSpeciality'],
    });
  }

  async createProfessional(data: CreateProfessionalDto): Promise<Professional> {
    let user: User;
    if (data.user) user = await this.userService.createUser(data.user);
    else if (data.user_id) user = await this.userService.findUser(data.user_id);
    else
      throw new BadRequestException(
        'É necessário informar um usuário existente ou cadastrar um novo!',
      );

    const speciality = new Speciality();
    speciality.id = data.id_speciality;

    const subSpeciality = new SubSpeciality();
    if (data.id_sub_speciality) subSpeciality.id = data.id_sub_speciality;

    const professional = new Professional();
    professional.user = user;
    professional.council = data.council;
    professional.speciality = speciality;
    if (data.id_sub_speciality) professional.subSpeciality = subSpeciality;

    return await this.professionalRepository.save(professional);
  }
}
