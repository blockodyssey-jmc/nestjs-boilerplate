import { ConflictException, Inject } from "@nestjs/common";
import { randomInt } from "crypto";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2";
import { MarketDao } from "src/market/dao/market.dao";
import { Buy } from "../entities/buy.entity";

export class BuyDao {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly db: Pool,
        private readonly marketDao: MarketDao
    ) { }

    async create(): Promise<number> {
        const conn = await this.db.promise().getConnection().catch((e: Error) => {
            console.log(`DB connection Error : ${e}`)
            throw new ConflictException(`DB 커넥션 에러 발생`)
        })

        await conn.beginTransaction().catch((e) => {
            console.log(`DB beginTransaction Error : ${e}`)
            throw new ConflictException(`DB 데이터 트랜잭션 에러 발생`)
        })

        try {
            /** 
             * @desc 데이터 불러오는 부분을 재사용할것인지 내부에 포함하는게 나은지 고민
             let sql = `SELECT * FROM markets AS m WHERE m.id = ?`
             const [buyItem] = await conn.query<Array<Buy> & RowDataPacket[]>(sql, randomInt(1, 201))
             const [buyResult] = await conn.query<ResultSetHeader>(sql, [buyItem[0].id, buyItem[0].name, buyItem[0].desc, new Date()])
            */

            const buyItem = await this.marketDao.findOneById(randomInt(1, 201))
            let sql = "INSERT INTO buys (market_id, name, `desc`,order_date) VALUES (?,?,?,?)"
            const [buyResult] = await conn.query<ResultSetHeader>(sql, [buyItem.id, buyItem.name, buyItem.desc, new Date()])

            await conn.commit()
            conn.release();

            return buyResult.insertId
        } catch (e) {
            await conn.rollback()
            conn.release();
            console.log("DB Market 조회 혹은 Buy 저장 에러 발생 :", e)
            throw new ConflictException(`DB Buy 정보 저장 에러 발생`)
        }
    }
}

