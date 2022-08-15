import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido, PedidoDocument } from './schema/pedido.schema';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<PedidoDocument>,
  ) {}

  create(createPedidoDto: CreatePedidoDto) {
    return this.pedidoModel.create(createPedidoDto);
  }

  findAll() {
    return this.pedidoModel.find().exec();
  }

  findOne(id: string) {
    return this.pedidoModel.findOne({ _id: id }).exec();
  }

  update(id: string, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoModel.updateOne({ _id: id }, updatePedidoDto).exec();
  }

  // remove(id: string) {
  //   return `This action removes a #${id} pedido`;
  // }
}
