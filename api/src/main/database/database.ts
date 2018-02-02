import * as pg from 'pg';
import { EventEmitter } from 'events';
import * as config from 'config';

export class Database {
    static pool: pg.Pool;
    static create(): void {
        const options = {
            user: config.get<string>('Postgres.user'),
            password: config.get<string>('Postgres.password'),
            host: config.get<string>('Postgres.host'),
            database: config.get<string>('Postgres.db'),
            port: config.get<number>('Postgres.port')
        };
        if (!this.pool) {
            this.pool = new pg.Pool(options);
        }
    }

    static getConnection(): pg.Pool {
        if (!this.pool) {
            Database.create();
        }
        return this.pool;
    }

}
