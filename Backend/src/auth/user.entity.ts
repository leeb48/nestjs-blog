import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BlogPost } from '../post/blog-post.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  bio: string;

  @OneToMany(
    type => BlogPost,
    post => post.user,
    { eager: true },
  )
  blogPosts: BlogPost[];

  @ManyToMany(
    type => BlogPost,
    blogPost => blogPost.likedUsers,
  )
  likedPosts: BlogPost[];

  @Column()
  dateRegistered: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
