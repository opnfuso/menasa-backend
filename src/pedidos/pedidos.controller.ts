import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return await this.pedidosService.create(createPedidoDto);
  }

  @Get()
  async findAll() {
    return await this.pedidosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pedidosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidosService.remove(id);
  // }
}
