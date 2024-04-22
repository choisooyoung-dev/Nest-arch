import { Module } from '@nestjs/common';
import { DbConncetionService } from './db.conncetion.service';

@Module({
  providers: [DbConncetionService],
  exports: [DbConncetionService],
})
export class DbConncetionModule {}
