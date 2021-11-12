import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'enderecos',
})
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'logradouro',
    length: 50,
  })
  street: string;

  @Column('int', {
    name: 'numero',
    nullable: true,
  })
  number: number | null;

  @Column('varchar', {
    name: 'complemento',
    length: 50,
    nullable: true,
  })
  complement: string | null;

  @Column('varchar', {
    name: 'referencia',
    length: 100,
    nullable: true,
  })
  reference: string | null;

  @Column({
    name: 'cep',
    length: 9,
  })
  cep: string;

  @Column({
    name: 'bairro',
    length: 50,
  })
  neighborhood: string;
}
