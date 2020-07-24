import { IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

// DTO used for registering a new user
export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @IsOptional()
  bio: string;
}
