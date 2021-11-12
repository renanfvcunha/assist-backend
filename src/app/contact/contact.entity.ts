import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ContactType } from '~/app/contact/contact-type/contact-type.entity';

import { User } from '~/app/user/user.entity';
import { Clinic } from '~/app/clinic/clinic.entity';

@Entity({
  name: 'contatos',
})
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
    name: 'contato',
  })
  contact: string;

  @ManyToOne(() => ContactType, (contactType) => contactType.contacts, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'id_tipo_contato',
  })
  contactType: ContactType;

  @ManyToOne(() => User, (user) => user.contacts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_usuario',
  })
  user: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.contacts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_clinica',
  })
  clinic: Clinic;
}
