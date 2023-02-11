import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class OpenHouseInputDto {
  @IsString()
  @IsNotEmpty()
  property: string;

  @IsNumber()
  visitorAmount: number;

  @IsString()
  startDate: string;
}
