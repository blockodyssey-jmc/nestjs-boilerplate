import { Inject, Injectable } from '@nestjs/common';
import { MarketDao } from './dao/market.dao';
import { CreateMarketDto } from './dto/create-market.dto';

@Injectable()
export class MarketService {
  constructor(
    private readonly marketDao: MarketDao
  ) { }

  async create(createMarketDto: CreateMarketDto) {
    return await this.marketDao.create(createMarketDto)
  }

  async findAll() {
    return await this.marketDao.findAll()
  }

  async findOne(id: number) {
    return await this.marketDao.findOneById(id)
  }
}
