import { encodeBcrypt, decodeBcrypt } from '@app/transformers/decode.transformer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundError } from '@app/common/error/not-found.error';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ConflictError } from '@app/common/error/conflict.error';
import { PaginateResult } from 'mongoose';
import { MongooseModel } from '@app/interfaces/mongoose.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: MongooseModel<User>){}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = encodeBcrypt(createUserDto.password)
    // const user = new User();
    // user.nickname = createUserDto.nickname;
    // user.username = createUserDto.username;
    // user.password = createUserDto.password;
    // const createdUser = new this.userModel(createUserDto);
    // return createdUser.save();
    return await this.userModel.create(createUserDto);
  }

  async findOne(username) {
    const user = await this.userModel.findOne({username})
    if (!user) {
      throw new NotFoundError('未找到资源');
    }
    return user;
  }

  async findAll(querys): Promise<PaginateResult<User>> {
    return this.userModel.paginate(querys);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // 查找重复昵称
    const user = await this.userModel.find({
      nickname: { $eq: updateUserDto.nickname },
      _id: { $ne: id}
    });
    console.log('Log: UsersService -> update -> user', user);
    if (user.length > 0) {
      throw new ConflictError('昵称已存在');
    }
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }
}
