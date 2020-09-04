import { Controller, Post, Body, Put, UseGuards, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '@app/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { PaginateResult } from 'mongoose';
import { HttpProcessor } from '@app/decorators/http.decorator';
import { EmailService } from '@app/processors/helper/email.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CacheService } from '@app/processors/cache/cache.service';
import * as CACHE_KEY from '@app/common/constants/cache.constant';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly cacheService: CacheService
  ){}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto).then(() => {
      this.cacheService.set(CACHE_KEY.EMAIL_VALID, '123456');
    });
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
  @ApiBearerAuth()
  async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
