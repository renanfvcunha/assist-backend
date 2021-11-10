import { IsNotEmpty } from 'class-validator';

export class ContactTypeDto {
  @IsNotEmpty({
    message: 'Nome do tipo de contato é obrigatório!',
  })
  readonly name: string;
}
