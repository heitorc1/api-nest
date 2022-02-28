import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Queue } from 'bull';

@Controller('users')
export class UsersController {
  constructor(@InjectQueue('user') private readonly userQueue: Queue) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userQueue.add('create', {
      user: createUserDto,
    });
    return 'user created';
  }

  @Get()
  async findAll() {
    await this.userQueue.add('getAll');
    return 'list returned';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.userQueue.add('getOne', { id });
    return 'user returned';
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userQueue.add('update', {
      id,
      user: updateUserDto,
    });
    return 'user updated';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userQueue.add('delete', { id });
    return 'user deleted';
  }
}
