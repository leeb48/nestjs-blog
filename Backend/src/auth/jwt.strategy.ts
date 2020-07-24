import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SendUserInfoDto } from './dto/send-user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Decodes the JWT and calls validate function with the decoded JSON
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {
    // Extract the token from the request header
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // This method gets invoked after the token is decoded
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user = await this.userRepo.findOne({ username });

    if (!user) {
      throw new UnauthorizedException(['User is unauthorized']);
    }

    // Appends the found user to the request object
    return user;
  }
}
