import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbConncetionService } from 'src/db/db.conncetion.service';
import { DbConncetionModule } from 'src/db/db.conncetion.module';

@Module({
  controllers: [UserController],
  providers: [UserService, DbConncetionService],
  exports: [UserModule],
})
export class UserModule {}
