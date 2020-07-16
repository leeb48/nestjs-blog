import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const { firstName, lastName, username, password, bio } = createUserDto;

    // Encrypt user's password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.password = hash;
    user.bio = bio;
    user.salt = salt;

    const date = new Date();
    user.dateRegistered = `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()}`;

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return user.username;
  }

  async loginUser(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;

    //  Find user based on unique username
    const user = await this.findOne({ username });

    // Use the password to authenticate the user
    if (user && (await user.validatePassword(password))) {
      return user.username;
    }

    return null;
  }
}
