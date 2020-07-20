import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
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

  @Column()
  username: string;

  // TODO: Column for comments

  @Column()
  datePosted: string;
}
