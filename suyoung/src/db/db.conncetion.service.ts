import { Injectable } from '@nestjs/common';
import { ConnectionOptions } from 'mysql2';

const mysql = require('mysql2/promise');
const access: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
};
const conn = mysql.createPool(access);

@Injectable()
export class DbConncetionService {
  async query(sql: string) {
    const result = await conn.query(sql);
    return result;
  }

  async execute(sql: string, values: string[]) {
    const result = await conn.execute({
      sql,
      values,
    });

    return result;
  }
}

// root;
// qpqp170310;
// basic_project;
// 3306;
