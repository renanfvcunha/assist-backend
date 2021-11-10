import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '~/app/user/user.entity';

@Entity({
  name: 'permissoes',
})
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    name: 'nome',
  })
  name: string;

  @ManyToMany(() => User, (user) => user.permissions)
  @JoinTable({
    name: 'usuarios_permissoes',
    joinColumn: {
      name: 'id_permissao',
    },
    inverseJoinColumn: {
      name: 'id_usuario',
    },
  })
  users: User[];
}
