import { IsEmail, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  displayName: string;

  @IsString()
  password: string;

  @IsUrl()
  photoURL: string;
}
