import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@ApiCookieAuth('jwt_token')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Incorrect input' })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'ID', type: String })
  @ApiResponse({ type: User, description: 'User updated' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ description: 'User deleted' })
  @ApiParam({ name: 'id', description: 'ID', type: String })
  async delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ type: User, description: 'All users', isArray: true })
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiParam({ name: 'id', description: 'ID', type: String })
  @ApiResponse({ type: User, description: 'User' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
