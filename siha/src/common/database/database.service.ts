import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createPool, Pool, PoolConnection } from "mysql2/promise";

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
        this.pool = createPool({
            host: this.configService.get<string>("database.host"),
            user: this.configService.get<string>("database.user"),
            password: this.configService.get<string>("database.password"),
            database: this.configService.get<string>("database.database"),
            port: this.configService.get<number>("database.port"),
            waitForConnections: true,
            connectionLimit: 32,
        });
    }

    buildFullQueryString(query, parameters) {
        const parameterize = parameters.flat();
        let index = 0;
        return query.replace(/\?/g, () => {
            if (index < parameterize.length) {
                const value = parameterize[index++];
                if (typeof value === "string") {
                    return `'${value}'`;
                }
                return value;
            }
            return "?";
        });
    }

    async getConnection(): Promise<PoolConnection | undefined> {
        try {
            const connection = await this.pool.getConnection();

            const originalQuery = connection.query.bind(connection);
            connection.query = async (...args) => {
                try {
                    const fullQueryString = this.buildFullQueryString(args[0], args.slice(1));
                    console.log(fullQueryString);
                    const result = await originalQuery(...args);
                    return result;
                } catch (error) {
                    throw error;
                }
            };

            return connection;
        } catch (error) {
            console.error("데이터베이스 연결 중 오류 발생:", error.message);
            return undefined;
        }
    }

    // query logging
    async executeQueryLog(query: string, params?: any[]): Promise<any> {
        const connection = await this.getConnection();
        if (connection) {
            try {
                console.log(query);
                if (params) {
                    console.log(params);
                }
                const rows = await connection.query(query, params);
                return rows;
            } catch (error) {
                console.error("Error executing query:", error.message);
            } finally {
                connection.release();
            }
        }
    }
}
