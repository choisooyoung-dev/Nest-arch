import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 생성
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // 유저 전체 조회
  @Get('all')
  async findAll() {
    const users = await this.userService.findAll();
    return { users };
  }

  // 특정 유저 조회(이메일 사용)
  @Post('find')
  async findOne(@Body() data: object) {
    const email = JSON.stringify(Object.values(data)[0]);
    const user = await this.userService.findOneByEmail(email);
    return { user };
  }
}
