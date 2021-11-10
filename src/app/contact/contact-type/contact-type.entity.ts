import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Contact } from '~/app/contact/contact.entity';

@Entity({
  name: 'tipos_contato',
})
export class ContactType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    name: 'nome',
  })
  name: string;

  @OneToMany(() => Contact, (contact) => contact.contactType)
  contacts: Contact[];
}
