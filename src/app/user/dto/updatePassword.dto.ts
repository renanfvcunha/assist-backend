import { IsNotEmpty, Length } from 'class-validator';

import { Match } from '~/decorators/match.decorator';

export class UpdatePasswordDto {
  @IsNotEmpty({
    message: 'Senha antiga é obrigatória!',
  })
  readonly oldPassword: string;

  @IsNotEmpty({
    message: 'Nova senha é obrigatória!',
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
