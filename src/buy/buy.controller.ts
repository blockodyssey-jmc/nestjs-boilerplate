import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyService } from './buy.service';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Post()
  create() {
    return this.buyService.create();
  }
}