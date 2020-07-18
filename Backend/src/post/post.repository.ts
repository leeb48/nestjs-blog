import { Repository, EntityRepository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';

@EntityRepository(BlogPost)
export class PostRepository extends Repository<BlogPost> {
  async createPost(createPostDto: CreatePostDto, user: User): Promise<void> {
    const { title, content } = createPostDto;
    const newPost = new BlogPost();

    newPost.title = title;
    newPost.content = content;
    newPost.user = user;

    const date = new Date();

    newPost.datePosted = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;

    try {
      await newPost.save();
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }
  // TODO: Create fontend endpoint to use search feature
  async getPosts(getPostFilter: GetPostFilter): Promise<BlogPost[]> {
    const { search } = getPostFilter;

    const query = this.createQueryBuilder('blog_post');

    if (search) {
      query.andWhere(
        '(blog_post.title LIKE :search OR blog_post.content LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const posts = await query.getMany();

      return posts;
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async getUsersPosts(user: User): Promise<BlogPost[]> {
    const query = this.createQueryBuilder('blog_post');

    query.where('(blog_post."userId" = :userId)', { userId: user.id });

    const posts = await query.getMany();

    return posts;
  }
}
