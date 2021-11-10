import { IsNotEmpty } from 'class-validator';

export class PermissionDto {
  @IsNotEmpty({
    message: 'Nome da permissão é obrigatório!',
  })
  readonly name: string;
}
