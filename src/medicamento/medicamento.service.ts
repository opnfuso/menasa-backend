import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Medicamento, MedicamentoDocument } from './schema/medicamento.schema';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectModel(Medicamento.name)
    private medicamentoModel: Model<MedicamentoDocument>,
  ) { }

  create(createMedicamentoDto: CreateMedicamentoDto) {
    return this.medicamentoModel.create(createMedicamentoDto);
  }

  findAll() {
    return this.medicamentoModel.find().exec();
  }

  findOne(id: string) {
    return this.medicamentoModel.findOne({ _id: id }).exec();
  }

  findByFilter(filter: any) {
    if (filter.nombre !== undefined) {
      return this.medicamentoModel
        .find({ nombre: { $regex: filter.nombre } })
        .exec();
    }

    if (filter.codigo_barras !== undefined) {
      return this.medicamentoModel
        .findOne({ codigo_barras: filter.codigo_barras })
        .exec();
    }

    return undefined;
  }

  update(id: string, updateMedicamentoDto: UpdateMedicamentoDto) {
    return this.medicamentoModel.updateOne({ _id: id }, updateMedicamentoDto);
  }

  // remove(id: string) {
  //   return `This action removes a #${id} medicamento`;
  // }
}
