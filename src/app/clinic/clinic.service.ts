import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Clinic } from '~/app/clinic/clinic.entity';
import { Address } from '~/app/address/address.entity';
import { City } from '~/app/address/city/city.entity';
import { UF } from '~/app/address/uf/uf.entity';

import { CreateClinicDto } from '~/app/clinic/dto/createClinic.dto';

import { numberMask } from '~/helpers/masks.helper';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async createClinic(data: CreateClinicDto): Promise<Clinic> {
    /** Verificando se a clínica já está cadastrada */
    const clinicExists = await this.clinicRepository.findOne();

    if (clinicExists) {
      throw new UnprocessableEntityException('A clínica já está cadastrada!');
    }

    const city = new City();
    city.id = data.id_city;

    const uf = new UF();
    uf.id = data.id_uf;

    const address = new Address();
    address.street = data.street;
    address.number = data.number;
    address.complement = data.complement;
    address.reference = data.reference;
    address.neighborhood = data.neighborhood;
    address.cep = data.cep;
    address.city = city;
    address.uf = uf;

    const clinic = new Clinic();
    clinic.name = data.name;
    clinic.initials = data.initials;
    clinic.cnpj = numberMask(data.cnpj);
    clinic.address = address;

    return await this.clinicRepository.save(clinic);
  }
}
