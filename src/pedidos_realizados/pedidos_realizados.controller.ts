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
  create(@Body() createPedidosRealizadoDto: CreatePedidosRealizadoDto) {
    return this.pedidosRealizadosService.create(createPedidosRealizadoDto);
  }

  @Get()
  findAll() {
    return this.pedidosRealizadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosRealizadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePedidosRealizadoDto: UpdatePedidosRealizadoDto,
  ) {
    return this.pedidosRealizadosService.update(+id, updatePedidosRealizadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosRealizadosService.remove(+id);
  }
}
