import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateUserDto } from '~/app/user/dto/createUser.dto';

export class CreateProfessionalDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserDto)
  readonly user?: CreateUserDto;

  @IsOptional()
  @IsUUID('4', {
    message: 'Id do usuário deve estar no formato UUID!',
  })
  readonly user_id?: string;

  @IsNotEmpty({
    message: 'Número do conselho é obrigatório!',
  })
  readonly council: string;

  @IsNotEmpty({
    message: 'ID da especialidade é obrigatório!',
  })
  @IsNumber(undefined, {
    message: 'ID da especialidade deve ser um inteiro!',
  })
  readonly id_speciality: number;

  @IsOptional()
  @IsNumber(undefined, {
    message: 'ID da especialidade deve ser um inteiro!',
  })
  readonly id_sub_speciality?: number;
}
