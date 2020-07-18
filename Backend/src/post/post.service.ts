import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost } from './blog-post.entity';
import { User } from 'src/auth/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private postRepo: PostRepository,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<void> {
    await this.postRepo.createPost(createPostDto, user);
  }

  async getPosts(getPostFilter: GetPostFilter): Promise<BlogPost[]> {
    return await this.postRepo.getPosts(getPostFilter);
  }

  async getUsersPosts(user: User): Promise<BlogPost[]> {
    return await this.postRepo.getUsersPosts(user);
  }
}
