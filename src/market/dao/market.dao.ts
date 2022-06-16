import { ConflictException, Inject } from "@nestjs/common";
import { FieldPacket, Pool, ResultSetHeader, RowDataPacket } from "mysql2";
import { CreateMarketDto } from "../dto/create-market.dto";
import { Market } from "../entities/market.entity";

export class MarketDao {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly db: Pool
    ) { }

    async findAll(): Promise<Array<Market>> {
        const sql = `SELECT * FROM markets`
        try {
            const [result]: [Array<Market>, FieldPacket[]] = await this.db.promise().query<Array<Market> & RowDataPacket[]>(sql)
            return result
        } catch (e) {
            console.log(`findAll 데이터 조회 에러발생 : ${e}`)
            throw new ConflictException(`DB 유저 리스트 조회 에러발생`)
        }
    }

    async findOneById(id: number): Promise<Market> {
        const sql = `SELECT * FROM markets WHERE id = ?`
        try {
            const [result]: [Array<Market>, FieldPacket[]] = await this.db.promise().query<Array<Market> & RowDataPacket[]>(sql, id)
            return result[0]
        } catch (e) {
            console.log(`findOneById 데이터 조회 에러발생 : [ id : ${id} ] : ${e}`)
            throw new ConflictException(`DB 유저 조회 에러발생`)
        }
    }

    async create(createMarketDto: CreateMarketDto): Promise<number> {
        const sql = `INSERT INTO markets SET ?`
        try {
            const [result] = await this.db.promise().query<ResultSetHeader>(sql, createMarketDto)
            return result.insertId
        } catch (e) {
            console.log(`create product 에러발생 : [ createProductDto : ${createMarketDto} ] : ${e}`)
            throw new ConflictException(`DB 유저 생성 에러 발생`)
        }
    }
}
