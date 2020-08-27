import { IsNotEmpty } from 'class-validator';

export class EditBioDto {
  @IsNotEmpty()
  bio: string;
}
