import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePedidosRealizadoDto } from './dto/create-pedidos_realizado.dto';
import { UpdatePedidosRealizadoDto } from './dto/update-pedidos_realizado.dto';
import {
  PedidosRealizado,
  PedidosRealizadosDocument,
} from './schema/pedidos_realizado.schema';

@Injectable()
export class PedidosRealizadosService {
  constructor(
    @InjectModel(PedidosRealizado.name)
    private pedidosrealizadosModel: Model<PedidosRealizadosDocument>,
  ) {}

  create(createPedidosRealizadoDto: CreatePedidosRealizadoDto) {
    return this.pedidosrealizadosModel.create(createPedidosRealizadoDto);
  }

  findAll() {
    return this.pedidosrealizadosModel.find().exec();
  }

  findOne(id: string) {
    return this.pedidosrealizadosModel.findOne({ _id: id }).exec();
  }

  update(id: string, updatePedidosRealizadoDto: UpdatePedidosRealizadoDto) {
    return this.pedidosrealizadosModel.updateOne(
      { _id: id },
      updatePedidosRealizadoDto,
    );
  }

  // remove(id: number) {
  //   return `This action removes a #${id} pedidosRealizado`;
  // }
}
