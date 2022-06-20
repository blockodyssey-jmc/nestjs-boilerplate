import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from 'mysql2'
import { CreateUserDto } from "../dto/req/create-user.dto";
import { UpdateUserDto } from "../dto/req/update-user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserDao {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly db: Pool
    ) { }

    async findAll(): Promise<Array<User>> {
        const sql = `SELECT * FROM users`
        try {
            const [result]: [Array<User>, FieldPacket[]] = await this.db.promise().query<Array<User> & RowDataPacket[]>(sql)
            return result
        } catch (e) {
            console.log(`findAll 데이터 조회 에러발생 : ${e}`)
            throw new ConflictException(`DB 유저 리스트 조회 에러발생`)
        }
    }

    async findOneById(id: number): Promise<User> {
        const sql = `SELECT * FROM users WHERE uid = ?`
        try {
            const [result]: [Array<User>, FieldPacket[]] = await this.db.promise().query<Array<User> & RowDataPacket[]>(sql, id)
            return result[0]
        } catch (e) {
            console.log(`findOneById 데이터 조회 에러발생 : [ id : ${id} ] : ${e}`)
            throw new ConflictException(`DB 유저 조회 에러발생`)
        }
    }

    async create(createUserDto: CreateUserDto): Promise<number> {
        const sql = `INSERT INTO users SET ?`
        try {
            const [result] = await this.db.promise().query<ResultSetHeader>(sql, createUserDto)
            return result.insertId
        } catch (e) {
            console.log(`create user 에러발생 : [ createUserDto : ${createUserDto} ] : ${e}`)
            throw new ConflictException(`DB 유저 생성 에러 발생`)
        }
    }

    async update(id: number, updateUserDto: CreateUserDto | UpdateUserDto) {
        const sql = `UPDATE users SET ? WHERE uid = ?`
        try {
            await this.db.promise().query<ResultSetHeader>(sql, [updateUserDto, id])
        } catch (e) {
            console.log(`update user 에러발생 : [ id : ${id}, updateUserDto : ${updateUserDto} ] : ${e}`)
            throw new ConflictException(`DB 유저 수정 에러발생`)
        }
    }

    async delete(id: number) {
        const sql = `DELETE FROM users WHERE uid = ?`
        try {
            await this.db.promise().query<ResultSetHeader>(sql, [id])
        } catch (e) {
            console.log(`delete user 에러발생  : [ id : ${id} ] : ${e}`)
            throw new ConflictException(`DB 유저 삭제 에러발생`)
        }
    }
}

