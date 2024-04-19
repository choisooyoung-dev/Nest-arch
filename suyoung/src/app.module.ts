import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbConncetionService } from './db/db.conncetion.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV == 'dev' ? '.dev.env' : '.prod.env',
      isGlobal: true,
    }),
    HttpModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbConncetionService],
})
export class AppModule {}
