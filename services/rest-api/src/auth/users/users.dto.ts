import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @ApiProperty({
    description: 'Password',
    example: 'init1234',
    type: String,
  })
  password: string;
}
