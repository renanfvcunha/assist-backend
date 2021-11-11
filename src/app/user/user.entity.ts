import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';

import { Permission } from '~/app/permission/permission.entity';
import { Contact } from '~/app/contact/contact.entity';

@Entity({
  name: 'usuarios',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'nome',
    length: 50,
  })
  name: string;

  @Column({
    name: 'nome_usuario',
    length: 16,
  })
  username: string;

  @Column({
    name: 'cpf',
    unique: true,
    length: 14,
  })
  cpf: string;

  @Column({
    name: 'senha',
    length: 150,
  })
  password: string;

  @CreateDateColumn({
    name: 'criado_em',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'atualizado_em',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'excluido_em',
  })
  deletedAt: Date;

  @BeforeInsert()
  async hashPasswordOnInsert(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

  @BeforeUpdate()
  async hashPasswordOnUpdate(): Promise<void> {
    if (this.password) this.password = await hash(this.password, 8);
  }

  @ManyToMany(() => Permission, (permission) => permission.users)
  permissions: Permission[];

  @OneToMany(() => Contact, (contact) => contact.user, {
    cascade: true,
  })
  contacts: Contact[];
}
