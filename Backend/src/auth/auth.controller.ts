import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AccessToken } from './interfaces/accessToken.interface';
import { GetUser } from '../decorators/get-user.decorator';
import { SendUserInfoDto } from './dto/send-user-info.dto';
import { JwtAuthGuard } from './guards/JwtAuthGuard.guard';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<AccessToken> {
    return await this.authService.registerUser(createUserDto);
  }

  @Post('/login')
  async loginUser(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<AccessToken> {
    return await this.authService.loginUser(authCredentialDto);
  }

  // Authenticate user from request token and send back
  // user profile information
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserInfo(@GetUser() user: User): SendUserInfoDto {
    return this.authService.getUser(user);
  }
}
