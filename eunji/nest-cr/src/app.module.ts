import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlService } from '../config/database.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),

  ],
  controllers: [AppController],
  providers: [AppService, MysqlService],  

})
export class AppModule {} 


