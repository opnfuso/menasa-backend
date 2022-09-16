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
    } else {
      const res = await getAuth().setCustomUserClaims(user.uid, {
        admin: false,
      });

      console.log(res);
    }

    return user;
  }

  async findAll() {
    const users = await getAuth().listUsers();
    return users.users;
  }

  async findOne(id: string) {
    return getAuth().getUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateId = updateUserDto.uid;
    if ('isAdmin' in updateUserDto) {
      const updateAdmin = updateUserDto.isAdmin;
      delete updateUserDto.isAdmin;

      const customClaims = (await getAuth().getUser(id)).customClaims;
      console.log(customClaims);
      if (customClaims === undefined || customClaims.admin === undefined) {
        throw new ForbiddenException();
      }

      const isAdmin = customClaims.admin;

      if (isAdmin) {
        if (updateAdmin) {
          await getAuth().setCustomUserClaims(updateId, { admin: true });
          return getAuth().updateUser(updateId, updateUserDto);
        } else {
          await getAuth().setCustomUserClaims(updateId, { admin: false });
          return getAuth().updateUser(updateId, updateUserDto);
        }
      } else {
        throw new ForbiddenException();
      }
    } else {
      return getAuth().updateUser(updateId, updateUserDto);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
