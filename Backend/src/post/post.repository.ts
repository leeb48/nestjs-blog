import { Repository, EntityRepository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    newPost.username = user.username;

    const date = new Date();

    newPost.datePosted = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;

    try {
      await newPost.save();
    } catch (error) {
      throw new InternalServerErrorException([error.message]);
    }
  }

  async getPostById(id: number): Promise<BlogPost> {
    try {
      const blogPost = await this.findOne({ id });

      if (!blogPost) {
        throw new NotFoundException(`Post with id ${id} could not be found`);
      }

      return blogPost;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: Create fontend endpoint to use search feature
  async getPostsWithQueryFilter(
    getPostFilter: GetPostFilter,
  ): Promise<BlogPost[]> {
    const { search, postId } = getPostFilter;

    const query = this.createQueryBuilder('blog_post');

    if (search) {
      query.andWhere(
        '(blog_post.title LIKE :search OR blog_post.content LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (postId) {
      query.andWhere('blog_post.id = :postId', { postId });
    }

    try {
      const posts = await query.getMany();

      // Reverse the posts to make the most recent post be on top
      return posts.reverse();
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

  async removePost(postId: number, user: User): Promise<void> {
    // Security check to make sure the owner of the post is making the removal request
    const query = this.createQueryBuilder('blog_post');

    // Make a query with the postId and the userId and see if a match exists
    query.where('(blog_post.id = :postId AND blog_post."userId" = :userId)', {
      postId,
      userId: user.id,
    });

    const queryRes = await query.getCount();

    if (queryRes === 0) {
      throw new NotFoundException(['Post made by the user could not be found']);
    }

    const post = await this.findOne({ id: postId });
    await post.remove();
  }
}
