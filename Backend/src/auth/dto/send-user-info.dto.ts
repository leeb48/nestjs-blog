import { BlogPost } from '../../post/blog-post.entity';

// DTO used when sending non-sensitive user information
export class SendUserInfoDto {
  firstName: string;

  lastName: string;

  username: string;

  bio: string;

  id: number;

  blogPostsFromUser: BlogPost[];

  dateRegistered: string;
}
