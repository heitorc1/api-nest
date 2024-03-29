import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  private readonly logger = new Logger(PostsService.name);

  create(createPostDto: CreatePostDto) {
    this.logger.log(`create ${createPostDto.title} post service`);
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    this.logger.log(`find all post service`);
    return this.postRepository.find();
  }

  findOne(id: number) {
    this.logger.log(`findOne ${id} post service`);
    return this.postRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    this.logger.log(`update ${id} post service`);
    const post = await this.postRepository.findOne(id);
    post.title = updatePostDto?.title;
    post.subtitle = updatePostDto?.subtitle;
    post.body = updatePostDto?.body;
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    this.logger.log(`remove ${id} post service`);
    const post = await this.postRepository.findOne(id);
    await this.postRepository.remove(post);
    return { message: 'Post deleted' };
  }
}
