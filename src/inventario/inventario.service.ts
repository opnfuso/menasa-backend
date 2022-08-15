import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    return this.inventarioModel.create(createInventarioDto);
  }

  findAll() {
    return this.inventarioModel
      .aggregate()
      .lookup({
        from: 'medicamentos',
        localField: 'id_medicamento',
        foreignField: '_id',
        as: 'medicamento',
      })
      .exec();
  }

  findOne(id: string) {
    return this.inventarioModel
      .aggregate()
      .match({ _id: new Types.ObjectId(id) })
      .lookup({
        from: 'medicamentos',
        localField: 'id_medicamento',
        foreignField: '_id',
        as: 'medicamento',
      })
      .exec();
  }

  update(id: string, updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioModel
      .updateOne({ _id: id }, updateInventarioDto)
      .exec();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} inventario`;
  // }
}
