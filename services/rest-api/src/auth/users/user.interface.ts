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
  @ApiProperty({ description: 'First Name', example: 'John', type: String })
  firstName: string;
  @ApiProperty({ description: 'Last Name', example: 'Smith', type: String })
  lastName: string;
  @ApiProperty({
    description: 'Email address',
    example: 'john.smith@test.com',
    type: 'string',
  })
  email: string;
  @ApiHideProperty()
  @Exclude()
  password?: string;
}
