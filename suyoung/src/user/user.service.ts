import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { ConnectionOptions } from 'mysql2';
import { DbConncetionService } from 'src/db/db.conncetion.service';

// mysql 연결
// const mysql = require('mysql2/promise');
// const access: ConnectionOptions = {
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'qpqp170310',
//   database: 'basic_project',
//   port: 3306,
// };

@Injectable()
export class UserService {
  constructor(private dbConnService: DbConncetionService) {}

  // 유저 등록
  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const sql =
        'INSERT INTO `user`(`name`, `email`, `password`) VALUES (?, ?, ?)';
      const values = [`${name}`, `${email}`, `${password}`];
      const result = this.dbConnService.execute(sql, values);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // 유저 전체 조회
  async findAll() {
    try {
      const findAllSql = 'SELECT * FROM user';
      const users = await this.dbConnService.query(findAllSql);
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  // 특정 유저 아이디 조회
  async findOneById(id: number) {
    try {
      const findUserSql = 'SELECT * FROM `user` WHERE `id` = ' + id;
      const user = await this.dbConnService.query(findUserSql);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // 특정 유저 이메일 조회
  async findOneByEmail(email: string) {
    try {
      const findUserSql = 'SELECT * FROM `user` WHERE `email` = ' + email;
      const user = await this.dbConnService.query(findUserSql);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }
}
