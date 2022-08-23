import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Medicamento } from 'src/medicamento/schema/medicamento.schema';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario, InventarioDocument } from './schema/inventario.schema';

@Injectable()
export class InventarioService {
  constructor(
    @InjectModel(Inventario.name)
    private inventarioModel: Model<InventarioDocument>,
  ) {}

  create(createInventarioDto: CreateInventarioDto) {
    let total = 0;

    createInventarioDto.lotes.forEach((lote) => {
      total += lote.cantidad;
    });

    createInventarioDto.piezas = total;
    return this.inventarioModel.create(createInventarioDto);
  }

  findAll() {
    return this.inventarioModel.find().populate('id_medicamento').exec();
  }

  findOne(id: string) {
    return this.inventarioModel
      .findOne({ _id: id })
      .populate('id_medicamento')
      .exec();
  }

  update(id: string, updateInventarioDto: UpdateInventarioDto) {
    let total = 0;

    updateInventarioDto.lotes.forEach((lote) => {
      total += lote.cantidad;
    });

    updateInventarioDto.piezas = total;
    return this.inventarioModel
      .updateOne({ _id: id }, updateInventarioDto)
      .exec();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} inventario`;
  // }
}
