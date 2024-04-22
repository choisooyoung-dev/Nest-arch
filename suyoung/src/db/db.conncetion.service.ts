import { Injectable } from '@nestjs/common';
import { ConnectionOptions } from 'mysql2';
import { SessionOptions } from 'express-session';
import { ConfigService } from '@nestjs/config';

require('dotenv').config();

// mysql 연결
const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// const sessionOptions: SessionOptions = {
//   secret: process.env.SESSION_KEY,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: Number(process.env.SESSION_MAXAGE),
//     httpOnly: true,
//     secure: true,
//   },
// };

@Injectable()
export class DbConncetionService {
  constructor(private readonly configService: ConfigService) {}

  async getConnection() {
    const options: ConnectionOptions = {
      host: this.configService.get<string>('database.host'),
      user: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      port: this.configService.get<number>('database.port'),
    };
    const conn = mysql.createConnection(options);
    return conn;
  }
}
