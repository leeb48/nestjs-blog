import { Repository, EntityRepository, AdvancedConsoleLogger } from 'typeorm';
import { PostComment } from './comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { User } from '../auth/user.entity';
import { BlogPost } from 'src/post/blog-post.entity';

@EntityRepository(PostComment)
export class CommentRepository extends Repository<PostComment> {
  async addComment(
    user: User,
    blogPost: BlogPost,
    addCommentDto: AddCommentDto,
  ): Promise<void> {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}
