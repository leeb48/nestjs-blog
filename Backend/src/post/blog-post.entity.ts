import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';

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

  @ManyToMany(
    type => User,
    user => user.likedPosts,
  )
  likedUsers: User[];

  // TODO: Column for comments

  @Column()
  datePosted: string;
}