import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { RoleEntity } from './Role.entity';

@Entity('role_descriptions')
export class RoleDescriptionEntity extends BaseEntity<RoleDescriptionEntity> {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => RoleEntity, (role) => role.descriptions)
  role: RoleEntity;

  @Column({ name: 'locale' })
  locale: string;

  @Column({ name: 'name' })
  description: string;
}
