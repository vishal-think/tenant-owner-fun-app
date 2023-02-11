import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EnrollHouseService } from './enroll-house.service';
import { EnrollHouseInputDto } from './dto/enroll-house.dto';

@Controller('app')
export class EnrollHouseController {
  constructor(private readonly enrollHouseService: EnrollHouseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/enroll')
  enrollUserHouse(@Body() enrollHouseInputDto: EnrollHouseInputDto) {
    return this.enrollHouseService.create(enrollHouseInputDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/unroll/:id')
  unEnrollUserHouse(@Param() id: string) {
    return this.enrollHouseService.update(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/enroll')
  getEnrollList() {
    return this.enrollHouseService.get();
  }
}
