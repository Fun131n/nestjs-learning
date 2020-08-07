import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  PaginateResult,
  paginate,
  PaginateOptions,
} from 'src/interfaces/paginate.interface';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nickname = createUserDto.nickname;
    user.account = createUserDto.account;
    user.password = await bcrypt.hash(createUserDto.password, 10)
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUsePage(query: PaginateOptions): Promise<PaginateResult<User>> {
    return paginate(User, query);
  }

  findOne(nickname: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  findOneWithPassword(account: string): Promise<User> {
    return this.usersRepository.createQueryBuilder('user')
      .where('user.account = :account', { account })
      .addSelect('user.password')
      .getOne()
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
