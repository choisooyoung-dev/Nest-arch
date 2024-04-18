import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';

@Injectable()
export class MysqlService {
    private dbConnection: mysql.Connection;
    
    //환경변수 처리할것.
    public async getConnection(){
        this.dbConnection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            database: 'board',
            password: 'Barunson!12345',
            port: 3306
        });
        return this.dbConnection;        
    }
}