import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateBoardDto } from './board/dto/create-board.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Post('board')
  @Render('index.ejs')
  async create(@Body() createBoardDto: CreateBoardDto){
    const posting = await this.appService.create(createBoardDto);
    return { data: posting };

  }

  @Get('board')
  @Render('index.ejs')
  async findAll() {
    const postList = await this.appService.findAll();
    return { data: postList };
  }

  @Get(':id')
  @Render('detail.ejs')
  async findOne(@Param('id') id: number): Promise<object> {
    const postDetail = await this.appService.findOne(id);
    return {data: postDetail};
  }
}
