import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidosStandbyService } from './pedidos_standby.service';
import { CreatePedidosStandbyDto } from './dto/create-pedidos_standby.dto';
import { UpdatePedidosStandbyDto } from './dto/update-pedidos_standby.dto';

@Controller('pedidos-standby')
export class PedidosStandbyController {
  constructor(private readonly pedidosStandbyService: PedidosStandbyService) {}

  @Post()
  async create(@Body() createPedidosStandbyDto: CreatePedidosStandbyDto) {
    const inventario = await this.pedidosStandbyService.create(
      createPedidosStandbyDto,
    );
    return inventario;
  }

  @Get()
  findAll() {
    return this.pedidosStandbyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosStandbyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePedidosStandbyDto: UpdatePedidosStandbyDto,
  ) {
    return this.pedidosStandbyService.update(id, updatePedidosStandbyDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidosStandbyService.remove(id);
  // }
}
