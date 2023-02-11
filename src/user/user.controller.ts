import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('app')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
