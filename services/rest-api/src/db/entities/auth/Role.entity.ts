import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { RoleDescriptionEntity } from './RoleDescription.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity<RoleEntity> {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', unique: true })
  name: string;

  @OneToMany(() => RoleDescriptionEntity, (description) => description.role)
  descriptions: RoleDescriptionEntity[];
}
