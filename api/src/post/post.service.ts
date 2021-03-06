import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost } from './blog-post.entity';
import { User } from '../auth/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private postRepo: PostRepository,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<void> {
    await this.postRepo.createPost(createPostDto, user);
  }

  async getPostById(id: number): Promise<BlogPost> {
    return this.postRepo.getPostById(id);
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return await this.postRepo.getAllPosts();
  }

  async getPostsWithQueryFilter(
    getPostFilter: GetPostFilter,
  ): Promise<BlogPost[]> {
    return await this.postRepo.getPostsWithQueryFilter(getPostFilter);
  }

  async getUsersPosts(user: User): Promise<BlogPost[]> {
    return await this.postRepo.getUsersPosts(user);
  }

  async removePost(postId: number, user: User): Promise<void> {
    await this.postRepo.removePost(postId, user);
  }

  async updatePost(
    postId: number,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<void> {
    await this.postRepo.updatePost(postId, updatePostDto, user);
  }
}
