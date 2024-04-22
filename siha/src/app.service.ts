import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./common/database/database.service";

@Injectable()
export class AppService {
    constructor(private readonly databaseService: DatabaseService) {}

    getHello(): string {
        return "main";
    }
}
