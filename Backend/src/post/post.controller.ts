import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  ValidationPipe,
  Query,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { BlogPost } from './blog-post.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../auth/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard.guard';

@Controller('blogpost')
export class PostController {
  constructor(private postService: PostService) {}

  // @INFO: Create a post after user authentication
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @GetUser() user: User,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<void> {
    await this.postService.createPost(createPostDto, user);
  }

  // @INFO: Get all post made by the current authenticated user
  @Get('/curr-user-posts')
  @UseGuards(JwtAuthGuard)
  async getUsersPosts(@GetUser() user: User): Promise<BlogPost[]> {
    return await this.postService.getUsersPosts(user);
  }

  // @INFO: Get post by ID
  @Get('/:id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<BlogPost> {
    return await this.postService.getPostById(id);
  }

  // @INFO: Get posts based on query options
  @Get()
  async getPostsWithQueryFilter(
    @Query(ValidationPipe) getPostFilter: GetPostFilter,
  ): Promise<BlogPost[]> {
    return await this.postService.getPostsWithQueryFilter(getPostFilter);
  }

  // TODO: Edit post feature

  // @INFO: Remove a post made by a user
  @Delete('/:id')
  @UseGuards(AuthGuard())
  async removePost(
    @Param('id') postId: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.postService.removePost(postId, user);
  }
}
