import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return getAuth().createUser(createUserDto);
  }

  findAll() {
    return getAuth().listUsers();
  }

  findOne(id: string) {
    return getAuth().getUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return getAuth().updateUser(id, updateUserDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
