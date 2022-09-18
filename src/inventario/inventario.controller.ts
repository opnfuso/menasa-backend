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
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @UseGuards(AuthGuard('firebase-jwt'))
  @Post()
  async create(
    @Body() createInventarioDto: CreateInventarioDto,
    @Req() request: Request,
  ) {
    return await this.inventarioService.create(createInventarioDto, request);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  async findAll() {
    return await this.inventarioService.findAll();
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(id);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventarioDto: UpdateInventarioDto,
    @Req() request: Request,
  ) {
    return this.inventarioService.update(id, updateInventarioDto, request);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inventarioService.remove(+id);
  // }
}
