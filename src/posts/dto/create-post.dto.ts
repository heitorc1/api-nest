import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(10, { message: 'Title is too short' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @MinLength(10, { message: 'Subtitle is too short' })
  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @MinLength(50, { message: 'Body is too short' })
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
