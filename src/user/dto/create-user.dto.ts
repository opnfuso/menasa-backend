import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  photoURL: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  disabled: boolean;
}
