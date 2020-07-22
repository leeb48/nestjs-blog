import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { PostComment } from '../comment/comment.entity';

@Entity()
export class BlogPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(
    type => User,
    user => user.blogPosts,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  user: User;

  @Column()
  username: string;

  // TODO: Column for comments
  @OneToMany(
    type => PostComment,
    postComment => postComment.blogPost,
    { eager: true, onDelete: 'CASCADE' },
  )
  postComments: PostComment[];

  @Column()
  datePosted: string;
}
