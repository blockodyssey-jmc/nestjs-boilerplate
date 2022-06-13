import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserDao } from './dao/user.dao';


@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserDao]
})
export class UserModule { }
