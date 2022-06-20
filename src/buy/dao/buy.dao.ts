import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { randomInt } from "crypto";
import { Pool, ResultSetHeader, RowDataPacket } from "mysql2";
import { Buy } from "../entities/buy.entity";

@Injectable()
export class BuyDao {
    constructor(
        @Inject('DATABASE_CONNECTION') private readonly db: Pool,
    ) { }

    async create(): Promise<Buy> {
        const conn = await this.db.promise().getConnection().catch((e: Error) => {
            console.log(`DB connection Error : ${e}`)
            throw new ConflictException(`DB 커넥션 에러 발생`)
        })

        await conn.beginTransaction().catch((e) => {
            console.log(`DB beginTransaction Error : ${e}`)
            throw new ConflictException(`DB 데이터 트랜잭션 에러 발생`)
        })

        try {
            let sql = `SELECT * FROM markets AS m WHERE m.id = ?`
        
            const [buyItem] = await conn.query<Array<Buy> & RowDataPacket[]>(sql, randomInt(1, 201))
            if (buyItem[0] == null) {
                console.log(`DB Market Not Found`)
                throw new NotFoundException(`DB market 정보 없음`)
            }
            sql = "INSERT INTO buys (market_id, name, `desc`,order_date) VALUES (?,?,?,?)"
            const orderDate = new Date()
            const [buyResult] = await conn.query<ResultSetHeader>(sql, [buyItem[0].id, buyItem[0].name, buyItem[0].desc, orderDate])

            await conn.commit()

            return Object.assign(buyItem[0], { id: buyResult.insertId, orderDate: orderDate })
        } catch (e) {
            await conn.rollback()
            console.log("DB Market 조회 혹은 Buy 저장 에러 발생 :", e)
            throw new ConflictException(`DB Buy 정보 저장 에러 발생`)
        } finally {
            conn.release();
        }
    }
}

