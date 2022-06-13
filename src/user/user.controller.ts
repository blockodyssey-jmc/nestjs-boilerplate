import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(204)
  updateUserTotalInfo(@Param('id', ParseIntPipe) id: string, @Body() updateUserTotalInfoDto: CreateUserDto) {
    return this.userService.update(+id, updateUserTotalInfoDto)
  }

  @Patch(':id')
  @HttpCode(204)
  updatePartialInfo(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.userService.delete(+id);
  }
}
