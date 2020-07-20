import { BlogPost } from 'src/post/blog-post.entity';

export class SendUserInfoDto {
  firstName: string;

  lastName: string;

  username: string;

  bio: string;

  id: number;

  blogPostsFromUser: BlogPost[];

  dateRegistered: string;
}
