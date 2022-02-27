import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(2, { message: 'Name is too short' })
  @MaxLength(30, { message: 'Name is too long' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(32, { message: 'Password is too long' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
