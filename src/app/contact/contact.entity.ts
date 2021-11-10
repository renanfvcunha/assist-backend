import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ContactType } from '~/app/contact/contact-type/contact-type.entity';

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
}
