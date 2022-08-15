import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidosService {
  create(createPedidoDto: CreatePedidoDto) {
    return 'This action adds a new pedido';
  }

  findAll() {
    return `This action returns all pedidos`;
  }

  findOne(id: string) {
    return `This action returns a #${id} pedido`;
  }

  update(id: string, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: string) {
    return `This action removes a #${id} pedido`;
  }
}
