import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from './interfaces/accessToken.interface';
import { GetUser } from 'src/decorators/get-user.decorator';
import { SendUserInfoDto } from './dto/send-user-info.dto';

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

  @Get()
  @UseGuards(AuthGuard())
  test(@GetUser() user: SendUserInfoDto): void {
    console.log(user);
  }
}
