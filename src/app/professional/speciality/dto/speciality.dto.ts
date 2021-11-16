import { IsNotEmpty } from 'class-validator';

export class SpecialityDto {
  @IsNotEmpty({
    message: 'Nome da especialidade é obrigatório!',
  })
  readonly name: string;
}
