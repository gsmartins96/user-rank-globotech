import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(): Promise<void> {
    for (let i = 0; i <= 99; i++) {
      await this.usersService.saveUser();
    }
  }

  @Get()
  list() {
    return this.usersService.list();
  }

  @Get('/order')
  order() {
    return this.usersService.orderUsers();
  }

  @Get('/userordered')
  listUserOrder() {
    return this.usersService.listOrderUser();
  }

  @Get('/firsts')
  getSomeUsers(@Query() { n }) {
    return this.usersService.listSomeUsers(n);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(+id);
  }
}
