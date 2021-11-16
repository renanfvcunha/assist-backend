import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Speciality } from '~/app/professional/speciality/speciality.entity';
import { Professional } from '../professional.entity';

@Entity({
  name: 'sub_especialidades',
})
export class SubSpeciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nome',
    length: 50,
  })
  name: string;

  @ManyToOne(() => Speciality, (speciality) => speciality.subSpecialities, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_especialidade',
  })
  speciality: Speciality;

  @OneToMany(() => Professional, (professional) => professional.subSpeciality)
  professionals: Professional[];
}
