import { Module } from '@nestjs/common';
import { BuyModule } from './buy/buy.module';
import { DatabaseModule } from './database/database.module';
import { MarketModule } from './market/market.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, BuyModule, MarketModule],
  controllers: [],
  providers: [],
})

export class AppModule {
}
