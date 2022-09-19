import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import mongoose, { Model } from 'mongoose';
import { CreateHistorialDto } from 'src/historial/dto/create-historial.dto';
import { HistorialService } from 'src/historial/historial.service';
import { MedicamentoService } from 'src/medicamento/medicamento.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Inventario, InventarioDocument } from './schema/inventario.schema';

@Injectable()
export class InventarioService {
  constructor(
    @InjectModel(Inventario.name)
    private inventarioModel: Model<InventarioDocument>,
    private readonly medicamentoService: MedicamentoService,
    private historialService: HistorialService,
  ) {}

  async create(createInventarioDto: CreateInventarioDto, request: Request) {
    const id = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    let total = 0;

    const id_medicamento = createInventarioDto.id_medicamento;

    createInventarioDto.lotes.forEach((lote) => {
      lote.fecha_ingreso = new Date(lote.fecha_ingreso);
      lote.fecha_vencimiento = new Date(lote.fecha_ingreso);
    });

    await this.medicamentoService.update(
      id_medicamento.toString(),
      {
        hasInventory: true,
      },
      request,
    );

    createInventarioDto.lotes.forEach((lote) => {
      total += lote.cantidad;
    });

    createInventarioDto.piezas = total;

    const inventario = await this.inventarioModel.create(createInventarioDto);

    const historial: CreateHistorialDto = {
      category: 'inventario',
      userId: id,
      action: 'crear',
      id_inventario: inventario._id,
    };

    await this.historialService.create(historial);

    return inventario;
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

  async update(
    id: string,
    updateInventarioDto: UpdateInventarioDto,
    request: Request,
  ) {
    const uid = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    let total = 0;

    updateInventarioDto.lotes.forEach((lote) => {
      lote.fecha_ingreso = new Date(lote.fecha_ingreso);
      lote.fecha_vencimiento = new Date(lote.fecha_ingreso);
    });

    updateInventarioDto.lotes.forEach((lote) => {
      total += lote.cantidad;
    });

    if (total === 0) {
      const id_medicamento = updateInventarioDto.id_medicamento;

      await this.medicamentoService.update(
        id_medicamento.toString(),
        {
          hasInventory: false,
        },
        request,
      );

      await this.inventarioModel.deleteOne({ _id: id });

      const historial: CreateHistorialDto = {
        category: 'inventario',
        userId: uid,
        action: 'eliminar',
        id_inventario: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);
    } else {
      updateInventarioDto.piezas = total;
      const inventario = await this.inventarioModel
        .updateOne({ _id: id }, updateInventarioDto)
        .exec();

      const historial: CreateHistorialDto = {
        category: 'inventario',
        userId: uid,
        action: 'actualizar',
        id_inventario: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);

      return inventario;
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} inventario`;
  // }
}
