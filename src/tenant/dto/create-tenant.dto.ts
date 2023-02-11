import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TenantInputDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
