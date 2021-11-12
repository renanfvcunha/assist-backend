import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Address } from '../address.entity';

@Entity({
  name: 'cidades',
})
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nome',
    length: 50,
  })
  name: string;

  @Column({
    name: 'sigla_uf',
    length: 2,
  })
  uf: string;

  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];
}
