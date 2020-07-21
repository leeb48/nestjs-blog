import {
  Controller,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../auth/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { JwtAuthGuard } from '../auth/guards/JwtAuthGuard.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/:postId')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @GetUser() user: User,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() addCommentDto: AddCommentDto,
  ): Promise<void> {
    await this.commentService.addComment(user, postId, addCommentDto);
  }
}
