import { IsOptional } from 'class-validator';

export class GetPostFilter {
  @IsOptional()
  search: string;

  @IsOptional()
  postId: number;
}
