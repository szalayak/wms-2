import { ApiProperty } from '@nestjs/swagger';

export class UserInfo {
  @ApiProperty({
    description: 'Username/Email Address',
    type: String,
    example: 'john.smith@test.com',
  })
  username: string;
  @ApiProperty({
    description: 'Password',
    type: String,
    example: 'password',
  })
  password: string;
}
export class AccessToken {
  @ApiProperty({
    description: 'Access Token',
    type: String,
    example: '1234dsnfksd7235432',
  })
  access_token: string;
}
