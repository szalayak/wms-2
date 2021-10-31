import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessToken } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './users/user.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate' })
  @ApiResponse({ type: AccessToken })
  @ApiBasicAuth()
  async authenticate(@Request() req, @Response() res) {
    const result = await this.authService.login(req.user);
    res.cookie('jwt_token', result.access_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get current profile' })
  @ApiResponse({ type: User })
  async profile(@Request() req) {
    return req.user;
  }
}
