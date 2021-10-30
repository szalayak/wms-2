import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: '80' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: '80' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: '80' })
  email: string;
}
