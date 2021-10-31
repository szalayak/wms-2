import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    description: 'Access Token',
    type: String,
    example: '1234dsnfksd7235432',
  })
  access_token: string;
}
