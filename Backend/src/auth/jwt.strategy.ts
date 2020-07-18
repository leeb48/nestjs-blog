import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SendUserInfoDto } from './dto/send-user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Decodes the JWT and calls validate function with the decoded JSON
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<SendUserInfoDto> {
    const { username } = payload;

    const user = await this.userRepo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
