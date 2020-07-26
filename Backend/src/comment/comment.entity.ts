import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BlogPost } from '../post/blog-post.entity';
import { User } from '../auth/user.entity';

@Entity()
export class PostComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  content: string;

  @ManyToOne(
    type => BlogPost,
    blogPost => blogPost.postComments,
    { eager: false, onDelete: 'CASCADE' },
  )
  blogPost: BlogPost;

  @ManyToOne(
    type => User,
    user => user.postComments,
    { eager: false, onDelete: 'CASCADE' },
  )
  user: User;
}
