import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlService } from './mysql.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';


@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration]
  })],
  controllers: [AppController],
  providers: [AppService, MysqlService],  

})
export class AppModule {} 


