import { Repository, EntityRepository, AdvancedConsoleLogger } from 'typeorm';
import { PostComment } from './comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { User } from '../auth/user.entity';
import { BlogPost } from 'src/post/blog-post.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(PostComment)
export class CommentRepository extends Repository<PostComment> {
  async addComment(
    user: User,
    blogPost: BlogPost,
    addCommentDto: AddCommentDto,
  ): Promise<void> {
    try {
      const { content } = addCommentDto;

      const newComment = new PostComment();
      newComment.username = user.username;
      newComment.content = content;
      newComment.blogPost = blogPost;
      newComment.user = user;

      await newComment.save();
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }
}
