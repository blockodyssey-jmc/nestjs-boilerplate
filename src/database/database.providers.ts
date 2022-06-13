import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { createPool, Pool } from 'mysql2';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<Pool> => {
            try {
                const client = createPool({
                    host: 'localhost',
                    port: 3310,
                    user: 'admin',
                    password: 'adminsql1@',
                    database: 'test_db',
                    waitForConnections: true,
                    connectionLimit: 10,
                    queueLimit: 0
                })

                return client;
            } catch (e) {
                console.log(`db 연결 에러 발생 : ${e}`)
                throw new InternalServerErrorException("DB 연결 에러발생");
            }
        },
    }
];
