import { Injectable } from '@nestjs/common';
import { BuyDao } from './dao/buy.dao';

@Injectable()
export class BuyService {
  constructor(
    private readonly buyDao: BuyDao,
  ) { }

  async create() : Promise<number> {
    const buyId= await this.buyDao.create()
    console.log(`buy 생성 성공 [ buyId :${buyId}]`)
    return buyId

  }
}
