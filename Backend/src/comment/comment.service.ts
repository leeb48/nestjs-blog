import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { User } from '../auth/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { PostService } from '../post/post.service';
import { PostComment } from './comment.entity';
import { EditCommentDto } from './dto/edit-comment.dto';

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

  async editComment(
    user: User,
    postId: number,
    commentId: number,
    editCommentDto: EditCommentDto,
  ): Promise<PostComment[]> {
    let blogPost = await this.postService.getPostById(postId);

    await this.commentRepo.editComment(
      user,
      blogPost,
      commentId,
      editCommentDto,
    );

    blogPost = await this.postService.getPostById(postId);

    return blogPost.postComments;
  }
}
