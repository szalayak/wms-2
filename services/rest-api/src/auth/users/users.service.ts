import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from './user.interface';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: QueryDeepPartialEntity<UserEntity> = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const result = await this.usersRepository.insert(user);
    return this.findById(result.identifiers[0].id);
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  async findByEmail(email: string): Promise<User> {
    const results = await this.usersRepository.find({
      where: {
        email,
      },
    });
    if (results) {
      return results[0];
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findById(id);
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
