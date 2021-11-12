import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { City } from '~/app/address/city/city.entity';
import { UF } from '~/app/address/uf/uf.entity';
import { Clinic } from '~/app/clinic/clinic.entity';

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

  @ManyToOne(() => City, (city) => city.addresses, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'id_cidade',
  })
  city: City;

  @ManyToOne(() => UF, (uf) => uf.addresses, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  @JoinColumn({
    name: 'id_uf',
  })
  uf: UF;

  @OneToOne(() => Clinic, (clinic) => clinic.address, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_clinica',
  })
  clinic: Clinic;
}
