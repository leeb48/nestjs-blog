import { Repository, EntityRepository } from 'typeorm';
import { PostComment } from './comment.entity';

@EntityRepository(PostComment)
export class CommentRepository extends Repository<PostComment> {}
