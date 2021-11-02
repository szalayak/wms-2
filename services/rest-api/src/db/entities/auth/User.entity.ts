import { hash, genSalt } from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  QueryRunner,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { RoleEntity } from './Role.entity';
import { RoleDescriptionEntity } from './RoleDescription.entity';

@Entity('users')
export class UserEntity extends BaseEntity<UserEntity> {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'email', nullable: true, unique: true })
  email: string;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'created_by_id', nullable: true })
  createdById: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'last_changed_by_id', nullable: true })
  lastChangedById: string;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  lastChangedAt: Date;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'userId', referencedColumnName: 'id' }],
  })
  roles: RoleEntity[];
}

export const insertDefaultAdmin = async (queryRunner: QueryRunner) => {
  // default admin user
  if (process.env.ADMIN_PASSWORD) {
    const roleDescription = await queryRunner.manager.save(
      new RoleDescriptionEntity({
        locale: 'en',
        description: 'Super User',
      }),
    );
    const adminRole = await queryRunner.manager.save(
      new RoleEntity({
        name: 'superuser',
        descriptions: [roleDescription],
      }),
    );
    await queryRunner.manager.save(
      new UserEntity({
        username: 'admin',
        password: await hash(process.env.ADMIN_PASSWORD, await genSalt()),
        roles: [adminRole],
      }),
    );
  }
};
