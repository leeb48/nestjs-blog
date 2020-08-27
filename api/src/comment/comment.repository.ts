import { Repository, EntityRepository } from 'typeorm';
import { PostComment } from './comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { User } from '../auth/user.entity';
import { BlogPost } from 'src/post/blog-post.entity';
import {
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { EditCommentDto } from './dto/edit-comment.dto';

@EntityRepository(PostComment)
export class CommentRepository extends Repository<PostComment> {
  async addComment(
    user: User,
    blogPost: BlogPost,
    addCommentDto: AddCommentDto,
  ): Promise<PostComment[]> {
    try {
      const { content } = addCommentDto;

      const newComment = new PostComment();
      newComment.username = user.username;
      newComment.content = content;
      newComment.blogPost = blogPost;
      newComment.user = user;

      await newComment.save();

      return blogPost.postComments;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async getCommentById(commentId: number): Promise<PostComment> {
    try {
      const comment = await this.findOne({ id: commentId });

      if (!comment) {
        throw new NotFoundException([
          `Comment with id ${commentId} was not found`,
        ]);
      }

      return comment;
    } catch (error) {
      console.log(error.message);
    }
  }

  async editComment(
    user: User,
    blogPost: BlogPost,
    commentId: number,
    editCommentDto: EditCommentDto,
  ): Promise<PostComment[]> {
    try {
      const { content } = editCommentDto;

      const comment = await this.findOne({ id: commentId });

      if (!comment) {
        throw new NotFoundException(['Comment not found']);
      }

      if (comment.username !== user.username) {
        throw new UnauthorizedException(['Not authorized to edit comment']);
      }

      comment.content = content;

      await comment.save();

      return blogPost.postComments;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async removeComment(user: User, commentId: number): Promise<void> {
    try {
      const comment = await this.findOne({ id: commentId });

      if (!comment) {
        throw new NotFoundException(['Comment not found']);
      }

      if (comment.username !== user.username) {
        throw new UnauthorizedException(['Not authorized to edit comment']);
      }

      await comment.remove();
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }
}
