import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getAuth } from 'firebase-admin/auth';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { CreateHistorialDto } from 'src/historial/dto/create-historial.dto';
import { Model } from 'mongoose';
import {
  Historial,
  HistorialDocument,
} from 'src/historial/schema/historial.schema';
import { HistorialService } from 'src/historial/historial.service';

@Injectable()
export class UserService {
  constructor(private historialService: HistorialService) {}

  async create(createUserDto: CreateUserDto, request: Request) {
    const id = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    const isAdmin = createUserDto.isAdmin;
    const create = createUserDto;
    delete create.isAdmin;
    const user = await getAuth().createUser(create);

    if (isAdmin) {
      await getAuth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    } else {
      await getAuth().setCustomUserClaims(user.uid, {
        admin: false,
      });
    }

    const historial: CreateHistorialDto = {
      category: 'user',
      userId: id,
      action: 'create',
      id_user: user.uid,
    };

    await this.historialService.create(historial);

    return user;
  }

  async findAll() {
    const users = await getAuth().listUsers();
    return users.users;
  }

  async findOne(id: string) {
    return getAuth().getUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto, request: Request) {
    const uid = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    const updateId = updateUserDto.uid;
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
          await getAuth().setCustomUserClaims(updateId, { admin: true });
          const historial: CreateHistorialDto = {
            category: 'user',
            userId: uid,
            action: 'update',
            id_user: id,
          };

          await this.historialService.create(historial);

          return getAuth().updateUser(updateId, updateUserDto);
        } else {
          await getAuth().setCustomUserClaims(updateId, { admin: false });
          const historial: CreateHistorialDto = {
            category: 'user',
            userId: uid,
            action: 'update',
            id_user: id,
          };

          await this.historialService.create(historial);
          return getAuth().updateUser(updateId, updateUserDto);
        }
      } else {
        throw new ForbiddenException();
      }
    } else {
      const historial: CreateHistorialDto = {
        category: 'user',
        userId: uid,
        action: 'update',
        id_user: id,
      };

      await this.historialService.create(historial);
      return getAuth().updateUser(updateId, updateUserDto);
    }
  }

  async remove(id: string, request: Request) {
    const uid = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    const historial: CreateHistorialDto = {
      category: 'user',
      userId: uid,
      action: 'delete',
      id_user: id,
    };

    await this.historialService.create(historial);

    return getAuth().deleteUser(id);
  }
}
