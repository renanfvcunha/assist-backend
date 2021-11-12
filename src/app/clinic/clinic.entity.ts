import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from '~/app/address/address.entity';
import { Contact } from '~/app/contact/contact.entity';

@Entity({
  name: 'clinica',
})
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nome',
    length: 60,
  })
  name: string;

  @Column({
    name: 'sigla',
    length: 10,
  })
  initials: string;

  @Column({
    length: 18,
  })
  cnpj: string;

  @Column('varchar', {
    length: 60,
    nullable: true,
  })
  logo: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address, (address) => address.clinic, {
    cascade: true,
  })
  address: Address;

  @OneToMany(() => Contact, (contact) => contact.clinic, {
    cascade: true,
  })
  contacts: Contact[];
}
