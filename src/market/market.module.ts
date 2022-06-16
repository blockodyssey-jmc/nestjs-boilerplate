import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MarketDao } from './dao/market.dao';

@Module({
  imports: [DatabaseModule],
  controllers: [MarketController],
  providers: [MarketService, MarketDao]
})
export class MarketModule { }
