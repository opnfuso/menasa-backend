import { Injectable } from '@nestjs/common';
import { CreatePedidosRealizadoDto } from './dto/create-pedidos_realizado.dto';
import { UpdatePedidosRealizadoDto } from './dto/update-pedidos_realizado.dto';

@Injectable()
export class PedidosRealizadosService {
  create(createPedidosRealizadoDto: CreatePedidosRealizadoDto) {
    return 'This action adds a new pedidosRealizado';
  }

  findAll() {
    return `This action returns all pedidosRealizados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidosRealizado`;
  }

  update(id: number, updatePedidosRealizadoDto: UpdatePedidosRealizadoDto) {
    return `This action updates a #${id} pedidosRealizado`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidosRealizado`;
  }
}
