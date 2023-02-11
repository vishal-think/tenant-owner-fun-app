import { IsNotEmpty, IsString } from 'class-validator';

export class EnrollHouseInputDto {
  @IsString()
  @IsNotEmpty()
  tenant: string;

  @IsString()
  @IsNotEmpty()
  openHouse: string;
}
