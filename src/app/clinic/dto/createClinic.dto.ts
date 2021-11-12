import { IsNotEmpty, Length } from 'class-validator';

import { CreateAddressDto } from '~/app/address/dto/createAddress.dto';

export class CreateClinicDto extends CreateAddressDto {
  @IsNotEmpty({
    message: 'Nome da clínica é obrigatório',
  })
  name: string;

  @IsNotEmpty({
    message: 'Sigla é obrigatória!',
  })
  initials: string;

  @IsNotEmpty()
  @Length(18, 18, {
    message: 'CNPJ deve ter exatamente 18 caracteres!',
  })
  cnpj: string;
}
