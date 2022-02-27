import { Injectable } from '@nestjs/common';
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

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);
    post.title = updatePostDto?.title;
    post.subtitle = updatePostDto?.subtitle;
    post.body = updatePostDto?.body;
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);
    await this.postRepository.remove(post);
    return { message: 'Post deleted' };
  }
}
