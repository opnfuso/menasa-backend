import { Injectable } from '@nestjs/common';
import { CreatePedidosStandbyDto } from './dto/create-pedidos_standby.dto';
import { UpdatePedidosStandbyDto } from './dto/update-pedidos_standby.dto';

@Injectable()
export class PedidosStandbyService {
  create(createPedidosStandbyDto: CreatePedidosStandbyDto) {
    return 'This action adds a new pedidosStandby';
  }

  findAll() {
    return `This action returns all pedidosStandby`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedidosStandby`;
  }

  update(id: number, updatePedidosStandbyDto: UpdatePedidosStandbyDto) {
    return `This action updates a #${id} pedidosStandby`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedidosStandby`;
  }
}
