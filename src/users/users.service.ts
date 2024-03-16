import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found}`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`user with email ${email} not found`);
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`user with username ${username} not found`);
    }

    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    this.userRepository.merge(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<DeleteResult> {
    const result: DeleteResult = await this.userRepository.delete(+id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return result;
  }
}
