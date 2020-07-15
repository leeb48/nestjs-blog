import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepo.registerUser(createUserDto);

    const payload: JwtPayload = { username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginUser(authCredentialDto: AuthCredentialDto): Promise<string> {
    return await this.userRepo.loginUser(authCredentialDto);
  }
}
