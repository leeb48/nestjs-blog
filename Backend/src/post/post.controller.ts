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
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { BlogPost } from './blog-post.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard.guard';

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

  // @INFO: Get posts based on query options
  @Get()
  async getPosts(
    @Query(ValidationPipe) getPostFilter: GetPostFilter,
  ): Promise<BlogPost[]> {
    return await this.postService.getPosts(getPostFilter);
  }

  // @INFO: Get all post made by the current authenticated user
  @Get('/curr-user-posts')
  @UseGuards(AuthGuard())
  async getUsersPosts(@GetUser() user: User): Promise<BlogPost[]> {
    return await this.postService.getUsersPosts(user);
  }

  // @INFO: Remove a post made by a user
  @Delete('/:id')
  @UseGuards(AuthGuard())
  async removePost(
    @Param('id') postId: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.postService.removePost(postId, user);
  }

  // TODO: Work on comments feature
  // TODO: Work on likes feature
}
