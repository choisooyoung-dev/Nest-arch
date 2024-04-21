import { Module } from '@nestjs/common';
import { DbConncetionService } from './db.conncetion.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [DbConncetionService],
  exports: [DbConncetionService],
})
export class DbConncetionModule {}
