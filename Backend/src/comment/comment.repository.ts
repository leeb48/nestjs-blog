import { Repository, EntityRepository, AdvancedConsoleLogger } from 'typeorm';
import { PostComment } from './comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { User } from '../auth/user.entity';

@EntityRepository(PostComment)
export class CommentRepository extends Repository<PostComment> {
  async addComment(
    user: User,
    postId: number,
    addCommentDto: AddCommentDto,
  ): Promise<void> {
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
}
