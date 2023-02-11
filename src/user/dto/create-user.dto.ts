import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserInputDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
}

export class LoginInput {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
