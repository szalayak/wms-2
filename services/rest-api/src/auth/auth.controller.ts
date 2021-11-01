import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessToken, UserInfo } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './users/user.interface';
import { UsersService } from './users/users.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate' })
  @ApiResponse({ type: AccessToken })
  @ApiBody({ type: UserInfo })
  @ApiConsumes('application/x-www-form-urlencoded')
  async authenticate(@Request() req, @Response() res) {
    const result = await this.authService.login(req.user);
    res.cookie('jwt_token', result.access_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.json(result);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCookieAuth('jwt_token')
  @Get('profile')
  @ApiOperation({ summary: 'Get current profile' })
  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }
}
