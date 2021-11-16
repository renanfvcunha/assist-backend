import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { User } from '~/app/user/user.entity';
import { Speciality } from '~/app/professional/speciality/speciality.entity';
import { SubSpeciality } from '~/app/professional/sub-speciality/sub-speciality.entity';

@Entity({
  name: 'profissionais',
})
export class Professional {
  @OneToOne(() => User, (user) => user.professional, {
    primary: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'id_usuario',
  })
  user: User;

  @Column({
    name: 'conselho',
    length: 30,
  })
  council: string;

  @ManyToOne(() => Speciality, (speciality) => speciality.professionals, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'id_especialidade',
  })
  speciality: Speciality;

  @ManyToOne(
    () => SubSpeciality,
    (subSpeciality) => subSpeciality.professionals,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({
    name: 'id_sub_especialidade',
  })
  subSpeciality: SubSpeciality;
}
