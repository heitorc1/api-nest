import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UsersService } from './users.service';

@Processor('user')
export class UserProcessor {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(UserProcessor.name);

  @Process('create')
  async handleCreate(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data.user,
      )}...`,
    );
    await this.usersService.create(job.data.user);
  }

  @Process('getAll')
  async handleGetAll(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}...`);
  }

  @Process('getOne')
  async handleGetOne(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with id ${job.data.id}...`,
    );
    await this.usersService.findOne(+job.data.id);
  }

  @Process('update')
  async handleUpdate(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with id ${
        job.data.id
      } and data ${JSON.stringify(job.data.user)}...`,
    );
    await this.usersService.update(+job.data.id, job.data.user);
  }

  @Process('delete')
  async handleDelete(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with id ${job.data.id}...`,
    );
    await this.usersService.remove(+job.data.id);
  }
}
