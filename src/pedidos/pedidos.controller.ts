import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @UseGuards(AuthGuard('firebase-jwt'))
  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return await this.pedidosService.create(createPedidoDto);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  async findAll() {
    return await this.pedidosService.findAll();
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pedidosService.findOne(id);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidosService.remove(id);
  // }
}
