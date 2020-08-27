import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AccessToken } from './interfaces/accessToken.interface';
import { GetUser } from '../decorators/get-user.decorator';
import { SendUserInfoDto } from './dto/send-user-info.dto';
import { JwtAuthGuard } from './guards/JwtAuthGuard.guard';
import { User } from './user.entity';
import { EditBioDto } from './dto/edit-bio.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @route   /auth/register
  // @info    Register a new user
  @Post('/register')
  async registerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<AccessToken> {
    return await this.authService.registerUser(createUserDto);
  }

  // @route   /auth/login
  // @info    Login a user
  @Post('/login')
  async loginUser(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<AccessToken> {
    return await this.authService.loginUser(authCredentialDto);
  }

  @Patch('/editbio')
  @UseGuards(JwtAuthGuard)
  async editbio(
    @GetUser() user: User,
    @Body() editBioDto: EditBioDto,
  ): Promise<void> {
    await this.authService.editBio(user, editBioDto);
  }

  // @route   /auth
  // @info    Sends information about the user when the
  //          request is made with a valid token
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserInfo(@GetUser() user: User): SendUserInfoDto {
    return this.authService.getUser(user);
  }
}
