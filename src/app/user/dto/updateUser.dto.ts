import { IsOptional, Length } from 'class-validator';

import { IsNotBlank } from '~/decorators/isNotBlank.decorator';
import { Match } from '~/decorators/match.decorator';

export class UpdateUserDto {
  @IsOptional()
  @Length(4, 50, {
    message: 'Nome deve ter entre 4 e 50 caracteres!',
  })
  readonly name?: string;

  @IsOptional()
  @Length(4, 16, {
    message: 'Nome de usuário deve ter entre 4 e 16 caracteres!',
  })
  @IsNotBlank({
    message: 'Nome de usuário não pode conter espaços!',
  })
  readonly username?: string;

  @IsOptional()
  @Length(14, 14, {
    message: 'CPF deve ter exatamente 14 caracteres!',
  })
  readonly cpf?: string;

  @IsOptional()
  @Length(6, 12, {
    message: 'Senha ter entre 6 e 12 caracteres!',
  })
  @Match('passwordConf', {
    message: 'Senhas não coincidem!',
  })
  readonly password?: string;

  @IsOptional()
  @Match('password', {
    message: 'Senhas não coincidem!',
  })
  readonly passwordConf?: string;
}
