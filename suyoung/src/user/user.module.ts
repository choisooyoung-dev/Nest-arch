import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbConncetionService } from 'src/db/db.conncetion.service';
import { DbConncetionModule } from 'src/db/db.conncetion.module';

@Module({
  imports: [DbConncetionModule],
  controllers: [UserController],
  providers: [UserService, DbConncetionService],
})
export class UserModule {}
