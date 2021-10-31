import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'ID', type: String })
  @ApiResponse({ type: User, description: 'Updated User' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'ID', type: String })
  async delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ type: User, description: 'All users', isArray: true })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiParam({ name: 'id', description: 'ID', type: String })
  @ApiResponse({ type: User, description: 'Created User' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
