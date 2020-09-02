import { Controller, Post, Body, Put, UseGuards, Get, Param, Query, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '@app/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { PaginateResult } from 'mongoose';
import { HttpProcessor } from '@app/decorators/http.decorator';
import { EmailService } from '@app/processors/helper/email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService  
  ){}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get(':username')
  async findOne(@Param('username') username) {
    return this.usersService.findOne(username);
  }

  @Get()
  @HttpProcessor.paginate()
  async findAll(@Query() query): Promise<PaginateResult<User>> {
    return this.usersService.findAll(query);
  }

  @Put(':id') 
  @UseGuards(JwtGuard)
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
