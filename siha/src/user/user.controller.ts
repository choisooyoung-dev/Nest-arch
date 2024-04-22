import { Controller, Get, Render, Post, Body, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUser } from "./dtos/user.request";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Render("user/user")
    async getUser() {
        const res = await this.userService.getUserList(); 
        return { res };
    }

    @Post()
    async createUser(@Body() createUserDto: createUser) {
        return await this.userService.createUser(createUserDto);
    }
}
