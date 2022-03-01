import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './user.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'user',
    }),
  ],
  providers: [UsersService, UserConsumer],
  controllers: [UsersController],
})
export class UsersModule {}
