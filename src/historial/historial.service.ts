import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { Historial, HistorialDocument } from './schema/historial.schema';

@Injectable()
export class HistorialService {
  constructor(
    @InjectModel(Historial.name)
    private historialModel: Model<HistorialDocument>,
  ) {}

  create(createHistorialDto: CreateHistorialDto) {
    return this.historialModel.create(createHistorialDto);
  }

  async findAll() {
    return this.historialModel
      .find()
      .populate('id_medicamento')
      .populate('id_inventario')
      .populate('id_pedido')
      .exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} historial`;
  // }

  // update(id: number, updateHistorialDto: UpdateHistorialDto) {
  //   return `This action updates a #${id} historial`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} historial`;
}
