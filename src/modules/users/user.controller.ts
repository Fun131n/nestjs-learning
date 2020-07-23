import { Controller, Post, Body, Get, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string): Promise<User> {
        return this.usersService.findOne(username);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}