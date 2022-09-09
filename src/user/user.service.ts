import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getAuth } from 'firebase-admin/auth';
import { ForbiddenException } from '@nestjs/common/exceptions';

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    if ('isAdmin' in updateUserDto) {
      const updateAdmin = updateUserDto.isAdmin;
      delete updateUserDto.isAdmin;

      const customClaims = (await getAuth().getUser(id)).customClaims;
      if (customClaims === undefined || customClaims.admin === undefined) {
        throw new ForbiddenException();
      }

      const isAdmin = customClaims.admin;

      if (isAdmin) {
        if (updateAdmin) {
          await getAuth().setCustomUserClaims(id, { admin: true });
          return getAuth().updateUser(id, updateUserDto);
        } else {
          await getAuth().setCustomUserClaims(id, { admin: false });
          return getAuth().updateUser(id, updateUserDto);
        }
      } else {
        throw new ForbiddenException();
      }
    } else {
      return getAuth().updateUser(id, updateUserDto);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
