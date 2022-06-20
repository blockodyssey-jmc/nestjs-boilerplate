import { Injectable } from '@nestjs/common';
import { BuyDao } from './dao/buy.dao';
import { Buy } from './entities/buy.entity';

@Injectable()
export class BuyService {
  constructor(
    private readonly buyDao: BuyDao,
  ) { }

  async create(): Promise<Buy> {
    const aBuy = await this.buyDao.create()
    console.log(`buy 생성 성공 [ buy :${aBuy}]`)
    return aBuy

  }
}
