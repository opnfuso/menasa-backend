import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import mongoose, { Model } from 'mongoose';
import { CreateHistorialDto } from 'src/historial/dto/create-historial.dto';
import { HistorialService } from 'src/historial/historial.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Medicamento, MedicamentoDocument } from './schema/medicamento.schema';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectModel(Medicamento.name)
    private medicamentoModel: Model<MedicamentoDocument>,
    private historialService: HistorialService,
  ) {}

  async create(createMedicamentoDto: CreateMedicamentoDto, request: Request) {
    const id = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    const medicamento = await this.medicamentoModel.create(
      createMedicamentoDto,
    );

    const historial: CreateHistorialDto = {
      category: 'medicamento',
      userId: id,
      action: 'crear',
      id_medicamento: medicamento._id,
    };

    await this.historialService.create(historial);
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

  async update(
    id: string,
    updateMedicamentoDto: UpdateMedicamentoDto,
    request: Request,
  ) {
    const uid = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    const medicamento = this.medicamentoModel.updateOne(
      { _id: id },
      updateMedicamentoDto,
    );

    if (updateMedicamentoDto.disabled === true) {
      const historial: CreateHistorialDto = {
        category: 'medicamento',
        userId: uid,
        action: 'eliminar',
        id_medicamento: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);
    } else {
      const historial: CreateHistorialDto = {
        category: 'medicamento',
        userId: uid,
        action: 'actualizar',
        id_medicamento: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);
    }

    return medicamento;
  }

  // remove(id: string) {
  //   return `This action removes a #${id} medicamento`;
  // }
}
