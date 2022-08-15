import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePedidosStandbyDto } from './dto/create-pedidos_standby.dto';
import { UpdatePedidosStandbyDto } from './dto/update-pedidos_standby.dto';
import {
  PedidosStandby,
  PedidosStandbyDocument,
} from './schema/pedidos_standby.schema';

@Injectable()
export class PedidosStandbyService {
  constructor(
    @InjectModel(PedidosStandby.name)
    private pedidosstandbyModel: Model<PedidosStandbyDocument>,
  ) {}

  create(createPedidosStandbyDto: CreatePedidosStandbyDto) {
    return 'This action adds a new pedidosStandby';
  }

  findAll() {
    return this.pedidosstandbyModel.find().exec();
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
