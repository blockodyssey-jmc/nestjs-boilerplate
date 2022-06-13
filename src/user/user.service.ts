import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserDao } from './dao/user.dao';
import { User } from './entities/user.entity';
import { UserDto } from './dto/res/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userDao: UserDao
  ) { }

  async findAll() {
    const result = await this.userDao.findAll()
    if (!result) {
      console.log(`유저 리스트가 존재하지않습니다.`)
      throw new NotFoundException(`존재하는 유저 정보가 없습니다.`)
    }
    return result;
  }

  async findOne(id: number): Promise<User> {
    const result = await this.userDao.findOneById(id)
    if (!result) {
      console.log(`유저 정보가 존재하지않습니다. : [ uid : ${id} ]`)
      throw new NotFoundException(`존재하는 유저 정보가 없습니다.`)
    }

    return result
  }

  async create(createUserDto: CreateUserDto): Promise<number> {
    const userId = await this.userDao.create(createUserDto)
    console.log(`유저 생성 성공 [ uid :${userId}]`)
    return userId
  }

  async update(id: number, updateUserTotalInfoDto: CreateUserDto | UpdateUserDto) {
    await this.findOne(id)
    
    return await this.userDao.update(id, updateUserTotalInfoDto)
  }

  async delete(id: number) {
    await this.findOne(id)

    return await this.userDao.delete(id)
  }
}
