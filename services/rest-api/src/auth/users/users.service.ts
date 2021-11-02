import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UserEntity } from 'src/db/entities/auth/User.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findByEmail(createUserDto.email)) {
      throw new BadRequestException('Email address already exists');
    }
    const user: QueryDeepPartialEntity<UserEntity> = {
      ...createUserDto,
      password: await hash(createUserDto.password, await genSalt()),
    };
    const result = await this.usersRepository.insert(user);
    return this.findById(result.identifiers[0].id);
  }

  async findAll(): Promise<User[]> {
    return (await this.usersRepository.find()).map((u) => new User(u));
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return new User(user);
  }

  async findByEmail(email: string): Promise<User> {
    const results = await this.usersRepository.find({
      where: {
        email,
      },
    });
    if (results.length > 0) {
      return new User(results[0]);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findById(id); // check if it exists
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
