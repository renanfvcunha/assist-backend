import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubSpecialityDto {
  @IsNotEmpty({
    message: 'ID da especialidade é obrigatório!',
  })
  @IsNumber(undefined, {
    message: 'ID da especialidade deve ser um inteiro!',
  })
  readonly id_speciality: number;

  @IsNotEmpty({
    message: 'Nome da especialidade é obrigatório!',
  })
  readonly name: string;
}
