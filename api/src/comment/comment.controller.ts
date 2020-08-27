import {
  Controller,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../auth/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard.guard';
import { PostComment } from './comment.entity';
import { EditCommentDto } from './dto/edit-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  // @route   /comment/:postId
  // @info    A comment is added to a post with postId
  @Post('/:postId')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @GetUser() user: User,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() addCommentDto: AddCommentDto,
  ): Promise<PostComment[]> {
    return await this.commentService.addComment(user, postId, addCommentDto);
  }

  // @route   /comment/:commentId
  // @info
  @Get('/:commentId')
  async getCommentById(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<PostComment> {
    return await this.commentService.getCommentById(commentId);
  }

  // @route   /comment/:postId/:commentId
  @Patch('/:postId/:commentId')
  @UseGuards(JwtAuthGuard)
  async editComment(
    @GetUser() user: User,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() editCommentDto: EditCommentDto,
  ): Promise<PostComment[]> {
    return await this.commentService.editComment(
      user,
      postId,
      commentId,
      editCommentDto,
    );
  }

  @Delete('/:commentId')
  @UseGuards(JwtAuthGuard)
  async removeComment(
    @GetUser() user: User,
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    await this.commentService.removeComment(user, commentId);
  }
}
