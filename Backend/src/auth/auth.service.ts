import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AccessToken } from './interfaces/accessToken.interface';
import { User } from './user.entity';
import { SendUserInfoDto } from './dto/send-user-info.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<AccessToken> {
    const username = await this.userRepo.registerUser(createUserDto);

    const payload: JwtPayload = { username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginUser(authCredentialDto: AuthCredentialDto): Promise<AccessToken> {
    const username = await this.userRepo.loginUser(authCredentialDto);

    if (!username) {
      throw new InternalServerErrorException(['Unauthorized']);
    }

    const payload: JwtPayload = { username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  getUser(user: User): SendUserInfoDto {
    const userInfo: SendUserInfoDto = {
      bio: user.bio,
      dateRegistered: user.dateRegistered,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      id: user.id,
      blogPostsFromUser: user.blogPosts,
    };

    return userInfo;
  }
}
