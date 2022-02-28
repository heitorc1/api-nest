import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`create ${createUserDto.name} user service`);
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    this.logger.log(`find all user service`);
    return this.userRepository.find();
  }

  findOne(id: number) {
    this.logger.log(`findOne ${id} user service`);
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`update ${id} user service`);
    const user = await this.userRepository.findOne(id);
    user.password = updateUserDto.password;
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    this.logger.log(`remove ${id} user service`);
    const user = await this.userRepository.findOne(id);
    await this.userRepository.remove(user);
    return { message: 'User deleted' };
  }
}
