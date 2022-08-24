import { IsBoolean, IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsBoolean()
  isImage: boolean;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsJWT()
  token: string;
}
