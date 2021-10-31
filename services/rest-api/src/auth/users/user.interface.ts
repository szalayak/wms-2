import { ApiProperty } from '@nestjs/swagger';

export class User {
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
  password?: string;
}
