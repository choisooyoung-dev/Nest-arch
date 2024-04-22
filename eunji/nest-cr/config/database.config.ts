
import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MysqlService {
    private dbConnection: mysql.Connection;
    
    public async getConnection(){
        try{
            this.dbConnection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: parseInt(process.env.DB_PORT, 10) || 3306
            });
            return this.dbConnection;        
        }catch(err){
            console.log(err);
        }
    }
}