import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsBoolean()
  isImage: boolean;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  userId: string;
}
