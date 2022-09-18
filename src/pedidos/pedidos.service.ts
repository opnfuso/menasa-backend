import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import mongoose, { Model } from 'mongoose';
import { CreateHistorialDto } from 'src/historial/dto/create-historial.dto';
import { HistorialService } from 'src/historial/historial.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido, PedidoDocument } from './schema/pedido.schema';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<PedidoDocument>,
    private historialService: HistorialService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, request: Request) {
    const id = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    createPedidoDto.fecha_entrada = new Date(createPedidoDto.fecha_entrada);
    createPedidoDto.fecha_salida = new Date(createPedidoDto.fecha_salida);

    const pedido = await this.pedidoModel.create(createPedidoDto);

    const historial: CreateHistorialDto = {
      category: 'pedido',
      userId: id,
      action: 'create',
      id_medicamento: pedido._id,
    };

    await this.historialService.create(historial);
  }

  findAll() {
    return this.pedidoModel
      .find()
      .populate({
        path: 'medicamentos.id_inventario',
        populate: [
          {
            path: 'id_medicamento',
          },
        ],
      })
      .exec();
  }

  findOne(id: string) {
    return this.pedidoModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto, request: Request) {
    const uid = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    updatePedidoDto.fecha_entrada = new Date(updatePedidoDto.fecha_entrada);
    updatePedidoDto.fecha_salida = new Date(updatePedidoDto.fecha_salida);

    const pedido = await this.pedidoModel
      .updateOne({ _id: id }, updatePedidoDto)
      .exec();

    if (updatePedidoDto.completado && updatePedidoDto.completado === true) {
      const historial: CreateHistorialDto = {
        category: 'pedido',
        userId: uid,
        action: 'complete',
        id_medicamento: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);
    } else {
      const historial: CreateHistorialDto = {
        category: 'pedido',
        userId: uid,
        action: 'update',
        id_medicamento: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);
    }

    return pedido;
  }

  // remove(id: string) {
  //   return `This action removes a #${id} pedido`;
  // }
}
