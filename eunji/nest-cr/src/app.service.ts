import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from '../src/posting.dto';
import { MysqlService } from '../config/database.config';

@Injectable()
export class AppService {
  constructor(private mysqlService: MysqlService) {}

  async create(createBoardDto: CreateBoardDto):Promise<object> {
    try {
      const conn = await this.mysqlService.getConnection();
      const values = [createBoardDto.title, createBoardDto.content];
      const sql = 'INSERT INTO `board`(`title`, `content`) VALUES (?, ?)';

      const [results, fields] = await conn.execute(sql, values);
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll():Promise<object> {
    try {
      const conn = await this.mysqlService.getConnection();
      const sql = 'SELECT * FROM `board`';
      const [rows, fields] = await conn.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }

  async findOne(id: number):Promise<object> {
    try {
      const conn = await this.mysqlService.getConnection();
      const sql = 'SELECT title, content FROM `board` WHERE `_id` = ?';

      const [rows, fields] = await conn.execute(sql, [id]);
      const data = { title: rows[0]?.title, content: rows[0]?.content };
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}