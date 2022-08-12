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
  ) {}

  create(createMedicamentoDto: CreateMedicamentoDto) {
    return 'This action adds a new medicamento';
  }

  async findAll() {
    return this.medicamentoModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} medicamento`;
  }

  update(id: number, updateMedicamentoDto: UpdateMedicamentoDto) {
    return `This action updates a #${id} medicamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicamento`;
  }
}
