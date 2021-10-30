import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from '.';

@Injectable()
export class UsersService {
  private users: User[];
  private id = 0;
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = { id: (this.id++).toString(), ...createUserDto };
    this.users.push(user);
    return user;
  }
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key];
    });
    return user;
  }
  async remove(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
