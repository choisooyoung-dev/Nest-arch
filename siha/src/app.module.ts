import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { DatabaseModule } from "./common/database/database.module";
import { UserModule } from "./user/user.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/core/exception.filter";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env.dev", ".env.prod"],
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
