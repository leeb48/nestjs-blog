import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
