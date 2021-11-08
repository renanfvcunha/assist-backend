import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    select: false,
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
}
