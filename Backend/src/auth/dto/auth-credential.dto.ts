// DTO used to perform login operation
import { IsNotEmpty } from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
