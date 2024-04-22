import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbConncetionService } from './db/db.conncetion.service';
import { DbConncetionModule } from './db/db.conncetion.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule,
    UserModule,
    AuthModule,
    DbConncetionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
