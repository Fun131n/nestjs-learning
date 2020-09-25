import { Controller, Post, Body, Put, UseGuards, Get, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '@app/guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { PaginateResult } from 'mongoose';
import { HttpProcessor } from '@app/decorators/http.decorator';
import { EmailService } from '@app/processors/helper/email.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheService } from '@app/processors/cache/cache.service';
import * as CACHE_KEY from '@app/common/constants/cache.constant';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly cacheService: CacheService
  ){}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpProcessor.paginate()
  async findAll(@Query() query): Promise<PaginateResult<User>> {
    return this.usersService.findAll(query);
  }

  @Put() 
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user._id, updateUserDto);
  }
}
