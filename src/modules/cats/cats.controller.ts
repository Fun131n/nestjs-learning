import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Roles } from '@app/common/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/roles/roles.guard';

@Controller('cats')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @Roles('superAdmin')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
