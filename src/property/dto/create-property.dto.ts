import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PropertyInputDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  address: string;
}
