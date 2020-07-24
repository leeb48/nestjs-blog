import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { User } from '../auth/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { PostService } from '../post/post.service';
import { BlogPost } from 'src/post/blog-post.entity';
import { PostComment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository) private commentRepo: CommentRepository,
    private postService: PostService,
  ) {}

  async addComment(
    user: User,
    postId: number,
    addCommentDto: AddCommentDto,
  ): Promise<PostComment[]> {
    let blogPost = await this.postService.getPostById(postId);

    await this.commentRepo.addComment(user, blogPost, addCommentDto);

    blogPost = await this.postService.getPostById(postId);

    return blogPost.postComments;
  }
}
