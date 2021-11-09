import { IsNotEmpty, Length } from 'class-validator';

import { IsNotBlank } from '~/decorators/isNotBlank.decorator';
import { Match } from '~/decorators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Nome é obrigatório!',
  })
  @Length(4, 50, {
    message: 'Nome deve ter entre 4 e 50 caracteres!',
  })
  readonly name: string;

  @IsNotEmpty({
    message: 'Nome de usuário é obrigatório!',
  })
  @Length(4, 16, {
    message: 'Nome de usuário deve ter entre 4 e 16 caracteres!',
  })
  @IsNotBlank({
    message: 'Nome de usuário não pode conter espaços!',
  })
  readonly username: string;

  @IsNotEmpty({
    message: 'CPF é obrigatório!',
  })
  @Length(14, 14, {
    message: 'CPF deve ter exatamente 14 caracteres!',
  })
  readonly cpf: string;

  @IsNotEmpty({
    message: 'Senha é obrigatória!',
  })
  @Length(6, 12, {
    message: 'Senha deve ter entre 6 e 12 caracteres!',
  })
  readonly password: string;

  @Match('password', {
    message: 'Senhas não coincidem!',
  })
  readonly passwordConf: string;
}
