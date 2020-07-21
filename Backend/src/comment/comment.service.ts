import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { User } from '../auth/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { PostService } from '../post/post.service';

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
  ): Promise<void> {
    const blogPost = await this.postService.getPostById(postId);

    console.log(blogPost);
    await this.commentRepo.addComment(user, postId, addCommentDto);
  }
}
