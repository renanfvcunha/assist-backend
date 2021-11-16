import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SubSpeciality } from '~/app/professional/sub-speciality/sub-speciality.entity';
import { Professional } from '~/app/professional/professional.entity';

@Entity({
  name: 'especialidades',
})
export class Speciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nome',
    length: 50,
  })
  name: string;

  @OneToMany(() => SubSpeciality, (subSpeciality) => subSpeciality.speciality, {
    cascade: true,
  })
  subSpecialities: SubSpeciality[];

  @OneToMany(() => Professional, (professional) => professional.speciality)
  professionals: Professional[];
}
