import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DbConncetionService } from 'src/db/db.conncetion.service';

@Injectable()
export class UserService {
  constructor(private readonly dbConnService: DbConncetionService) {}

  // 유저 등록
  async create(createUserDto: CreateUserDto) {
    const dbConn = await this.dbConnService.getConnection();
    try {
      const { name, email, password } = createUserDto;
      const sql =
        'INSERT INTO `user`(`name`, `email`, `password`) VALUES (?, ?, ?)';
      const values = [`${name}`, `${email}`, `${password}`];
      const result = await dbConn.execute(sql, values);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // 유저 전체 조회
  async findAll() {
    const dbConn = await this.dbConnService.getConnection();
    try {
      const findAllSql = 'SELECT * FROM user';
      const users = await dbConn.query(findAllSql);
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  // 특정 유저 아이디 조회
  async findOneById(id: number) {
    const dbConn = await this.dbConnService.getConnection();
    try {
      const findUserSql = 'SELECT * FROM `user` WHERE `id` = ' + id;
      const user = await dbConn.query(findUserSql);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // 특정 유저 이메일 조회
  async findOneByEmail(email: string) {
    const dbConn = await this.dbConnService.getConnection();
    try {
      const findUserSql = 'SELECT * FROM `user` WHERE `email` = ' + email;
      const user = await dbConn.query(findUserSql);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }
}
