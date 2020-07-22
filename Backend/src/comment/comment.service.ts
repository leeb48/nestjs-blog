import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { User } from '../auth/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { PostService } from '../post/post.service';
import { BlogPost } from 'src/post/blog-post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository) private commentRepo: CommentRepository,
    private postService: PostService,
  ) {}

  // TODO: Work on this next time

  async addComment(
    user: User,
    postId: number,
    addCommentDto: AddCommentDto,
  ): Promise<BlogPost> {
    try {
      const blogPost = await this.postService.getPostById(postId);

      if (!blogPost) {
        throw new NotFoundException(`Post with id ${postId} was not found`);
      }

      await this.commentRepo.addComment(user, blogPost, addCommentDto);

      return blogPost;
    } catch (error) {
      console.log(error.message);
    }
  }
}
