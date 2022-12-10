import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    return this.userService.create(createUserDto, request);
  }

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ) {
    return this.userService.update(id, updateUserDto, request);
  }

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.userService.remove(id, request);
  }
}
