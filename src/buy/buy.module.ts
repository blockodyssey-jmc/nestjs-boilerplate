import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BuyDao } from './dao/buy.dao';

@Module({
  imports: [DatabaseModule],
  controllers: [BuyController],
  providers: [BuyService, BuyDao]
})
export class BuyModule { }
