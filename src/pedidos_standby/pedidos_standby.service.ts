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
    return this.pedidosstandbyModel.create(CreatePedidosStandbyDto);
  }

  findAll() {
    return this.pedidosstandbyModel.find().exec();
  }

  findOne(id: string) {
    return this.pedidosstandbyModel.findOne({ _id: id }).exec();
  }

  update(id: string, updatePedidosStandbyDto: UpdatePedidosStandbyDto) {
    return this.pedidosstandbyModel.updateOne(
      { _id: id },
      updatePedidosStandbyDto,
    );
  }

  // remove(id: number) {
  //   return `This action removes a #${id} pedidosStandby`;
  // }
}
