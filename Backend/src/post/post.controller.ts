import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { BlogPost } from './blog-post.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';

@Controller('blogpost')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createPost(
    @GetUser() user: User,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ): Promise<void> {
    await this.postService.createPost(createPostDto, user);
  }

  @Get()
  async getPosts(
    @Query(ValidationPipe) getPostFilter: GetPostFilter,
  ): Promise<BlogPost[]> {
    return await this.postService.getPosts(getPostFilter);
  }

  @Get('/curr-user-posts')
  @UseGuards(AuthGuard())
  async getUsersPosts(@GetUser() user: User): Promise<BlogPost[]> {
    return await this.postService.getUsersPosts(user);
  }
}
