import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from '../post/post.module';
import { PostRepository } from 'src/post/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, PostRepository]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PostModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
