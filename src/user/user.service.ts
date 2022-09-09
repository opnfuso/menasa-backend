import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const create = createUserDto;
    delete create.isAdmin;
    const user = await getAuth().createUser(create);

    if (createUserDto.isAdmin) {
      const res = await getAuth().setCustomUserClaims(user.uid, {
        admin: true,
      });

      console.log(res);
    }

    return user;
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
