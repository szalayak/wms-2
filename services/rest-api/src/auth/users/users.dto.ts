import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First Name', example: 'John', type: String })
  firstName: string;
  @ApiProperty({ description: 'Last Name', example: 'Smith', type: String })
  lastName: string;
  @ApiProperty({
    description: 'Email address',
    example: 'john.smith@test.com',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'Password',
    example: 'init1234',
    type: String,
  })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'First Name',
    example: 'John',
    type: String,
    required: false,
  })
  firstName?: string;
  @ApiProperty({
    description: 'Last Name',
    example: 'Smith',
    type: String,
    required: false,
  })
  lastName?: string;
  @ApiProperty({
    description: 'Email address',
    example: 'john.smith@test.com',
    type: String,
    required: false,
  })
  email?: string;
  @ApiProperty({
    description: 'Password',
    example: 'init1234',
    type: String,
    required: false,
  })
  password?: string;
}
