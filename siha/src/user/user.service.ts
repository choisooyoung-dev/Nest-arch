import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/common/database/database.service";
import { RowDataPacket } from "mysql2";
import Res from "src/common/response.interface";
import { User } from "./dtos/user.response";
import { createUser } from "./dtos/user.request";

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getUserList(): Promise <Res<User[]>>{
        const db = await this.databaseService.getConnection();
        try {
            let [rows] = await db.query<RowDataPacket[]>(`SELECT * FROM user`);
            
            const users: User[] = rows.map(row => {
                return {
                    user_id: row.user_id,
                    name: row.name,
                    email: row.email,
                };
            });

            return { status: "success", message: "유저 조회 성공", data: users };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to get user list");
        } finally {
            db.release();
        }
    }

    async createUser(createUser: createUser): Promise <Res<boolean>>{
        const db = await this.databaseService.getConnection();
        try {
            await db.query(`INSERT INTO user (name, email) VALUES (?, ?)`, [createUser.name, createUser.email]);
            return { status: "success", message: "유저 생성 성공", data: true };
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create user");
        } finally {
            db.release();
        }
    }
}
