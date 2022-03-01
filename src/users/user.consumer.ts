import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UsersService } from './users.service';

@Processor('user')
export class UserConsumer {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UserConsumer.name);

  @Process('create')
  async handleCreate(job: Job) {
    const user = await this.usersService.create(job.data.user);
    return user;
  }

  @Process('getAll')
  async handleGetAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Process('getOne')
  async handleGetOne(job: Job) {
    const user = await this.usersService.findOne(+job.data.id);
    return user;
  }

  @Process('update')
  async handleUpdate(job: Job) {
    const user = await this.usersService.update(+job.data.id, job.data.user);
    return user;
  }

  @Process('delete')
  async handleDelete(job: Job) {
    const user = await this.usersService.remove(+job.data.id);
    return user;
  }

  @OnQueueCompleted()
  handlerCompleted(job: Job, result: any) {
    console.log('Job completed: job ', job.id, ' -> result: ', result);
  }

  @OnQueueFailed()
  handlerFailed(job: Job, result: any) {
    console.log('Job failed: job ', job.id, ' -> result: ', result);
  }

  @OnQueueError()
  handlerError(error: Error) {
    console.log('Error in job: job ', error.message);
  }
}
