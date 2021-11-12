import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({
    message: 'Nome da rua é obrigatório!',
  })
  street: string;

  @IsOptional()
  @IsNumber(undefined, {
    message: 'Número deve estar em formato númerico!',
  })
  number: number | null;

  complement: string | null;

  reference: string | null;

  @IsNotEmpty({
    message: 'CEP é obrigatório!',
  })
  cep: string;

  @IsNotEmpty({
    message: 'Bairro é obrigatório!',
  })
  neighborhood: string;

  @IsNotEmpty({
    message: 'É necessário informar a UF!',
  })
  id_uf: number;

  @IsNotEmpty({
    message: 'É necessário informar a cidade!',
  })
  id_city: number;
}
