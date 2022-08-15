import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidosRealizadosService } from './pedidos_realizados.service';
import { CreatePedidosRealizadoDto } from './dto/create-pedidos_realizado.dto';
import { UpdatePedidosRealizadoDto } from './dto/update-pedidos_realizado.dto';

@Controller('pedidos-realizados')
export class PedidosRealizadosController {
  constructor(
    private readonly pedidosRealizadosService: PedidosRealizadosService,
  ) {}

  @Post()
  async create(@Body() createPedidosRealizadoDto: CreatePedidosRealizadoDto) {
    const pedidoC = await this.pedidosRealizadosService.create(
      createPedidosRealizadoDto,
    );
    return pedidoC;
  }

  @Get()
  findAll() {
    return this.pedidosRealizadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosRealizadosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePedidosRealizadoDto: UpdatePedidosRealizadoDto,
  ) {
    return this.pedidosRealizadosService.update(id, updatePedidosRealizadoDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidosRealizadosService.remove(id);
  // }
}
