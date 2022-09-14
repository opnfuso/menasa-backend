import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
  ) {}

  async create(createInventarioDto: CreateInventarioDto) {
    let total = 0;

    const id_medicamento = createInventarioDto.id_medicamento;

    await this.medicamentoService.update(id_medicamento.toString(), {
      hasInventory: true,
    });

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

  async update(id: string, updateInventarioDto: UpdateInventarioDto) {
    let total = 0;

    updateInventarioDto.lotes.forEach((lote) => {
      total += lote.cantidad;
    });

    if (total === 0) {
      const id_medicamento = updateInventarioDto.id_medicamento;

      await this.medicamentoService.update(id_medicamento.toString(), {
        hasInventory: false,
      });
    }

    updateInventarioDto.piezas = total;
    return this.inventarioModel
      .updateOne({ _id: id }, updateInventarioDto)
      .exec();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} inventario`;
  // }
}
