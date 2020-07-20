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
    },
  )
  user: User;

  @Column()
  username: string;

  // TODO: Column for comments
  @OneToMany(
    type => PostComment,
    postComment => postComment.blogPost,
    { eager: true },
  )
  postComments: PostComment[];

  @Column()
  datePosted: string;
}
