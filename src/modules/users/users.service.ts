import { encodeBcrypt, decodeBcrypt } from '@app/transformers/decode.transformer';
import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundError } from '@app/common/error/not-found.error';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, setUserDefault } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ConflictError } from '@app/common/error/conflict.error';
import { PaginateResult } from 'mongoose';
import { MongooseModel } from '@app/interfaces/mongoose.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: MongooseModel<User>){}
  
  async create(createUserDto: CreateUserDto){
    createUserDto.password = encodeBcrypt(createUserDto.password)
    const userByNickname = await this.findOneByNickname(createUserDto.nickname);
    const userByEmail = await this.findOneByEmail(createUserDto.email);
    if (userByNickname) {
      throw new ConflictError('昵称已存在');
    }else if (userByEmail) {
      throw new ConflictError('邮箱已被注册');
    } 

    const user = await this.userModel.create({ ...createUserDto, ...setUserDefault()});
    return { _id: user.id};
  }

  async findOneByEmail(email) {
    return await this.userModel.findOne({email}).select("password");
  }

  async findAll(querys): Promise<PaginateResult<User>> {
    return this.userModel.paginate(querys);
  }

  async findOneByNickname(nickname) {
    return await this.userModel.findOne({nickname});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.nickname && await this.isNicknameExist(id, updateUserDto.nickname)) {
      throw new ConflictError('昵称已存在');
    }
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

   // 查找重复昵称
  async isNicknameExist(id: string, nickname: string) {
    const user = await this.userModel.find({
      nickname: { $eq: nickname },
      _id: { $ne: id}
    });
    return user.length > 0 ? true : false;
  }
}
