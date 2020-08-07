import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { HttpProcessor } from 'src/decorators/http.decorator';
import { PaginateResult } from 'src/interfaces/paginate.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpProcessor.handle('创建用户')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('page')
  @HttpProcessor.paginate()
  findUsePage(@Query() query): Promise<PaginateResult<User>> {
    return this.usersService.findUsePage(query);
  }

  @Get(':nickname')
  findOne(@Param('nickname') nickname: string): Promise<User> {
    return this.usersService.findOne(nickname);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
