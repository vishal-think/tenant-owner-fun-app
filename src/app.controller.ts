import { Controller, Get } from '@nestjs/common';
import { InjectLogger } from 'nestjs-winston-logger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
