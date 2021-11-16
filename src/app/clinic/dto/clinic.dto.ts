import { IsNotEmpty, Length } from 'class-validator';

import { CreateAddressDto } from '~/app/address/dto/createAddress.dto';

export class ClinicDto extends CreateAddressDto {
  @IsNotEmpty({
    message: 'Nome da clínica é obrigatório',
  })
  name: string;

  @IsNotEmpty({
    message: 'Sigla é obrigatória!',
  })
  initials: string;

  @IsNotEmpty({
    message: 'CNPJ é obrigatório!',
  })
  @Length(18, 18, {
    message: 'CNPJ deve ter exatamente 18 caracteres!',
  })
  cnpj: string;
}
