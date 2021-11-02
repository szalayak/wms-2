import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }

  @ApiProperty({ description: 'ID', example: '1', type: String })
  id: string;
  @ApiProperty({
    description: 'First Name',
    example: 'John',
    type: String,
    required: false,
  })
  firstName: string;
  @ApiProperty({
    description: 'Last Name',
    example: 'Smith',
    type: String,
    required: false,
  })
  lastName: string;
  @ApiProperty({
    description: 'Email address',
    example: 'john.smith@test.com',
    type: String,
    required: false,
  })
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'jsmith',
    type: String,
    required: false,
  })
  username: string;

  @ApiHideProperty()
  @Exclude()
  password?: string;

  @ApiProperty({
    description: 'User ID of user that created the record',
    type: String,
  })
  createdById: string;

  @ApiProperty({
    description: 'Date/Time when the record was changed',
    example: new Date().toISOString(),
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User ID of user that last changed the record',
    type: String,
  })
  lastChangedById: string;

  @ApiProperty({
    description: 'Date/Time when the record was last',
    example: new Date().toISOString(),
    type: Date,
  })
  lastChangedAt: Date;
}
