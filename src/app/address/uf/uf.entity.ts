import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../address.entity';

@Entity({
  name: 'ufs',
})
export class UF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'sigla',
    length: 2,
  })
  uf: string;

  @OneToMany(() => Address, (address) => address.uf)
  addresses: Address[];
}
