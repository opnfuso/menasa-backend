import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';
import mongoose, { deleteModel, Model } from 'mongoose';
import { CreateHistorialDto } from 'src/historial/dto/create-historial.dto';
import { HistorialService } from 'src/historial/historial.service';
import { InventarioService } from 'src/inventario/inventario.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido, PedidoDocument } from './schema/pedido.schema';
import { Low, JSONFile } from 'lowdb';
import { Inventario } from 'src/inventario/schema/inventario.schema';
import { UpdateInventarioDto } from 'src/inventario/dto/update-inventario.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel(Pedido.name)
    private readonly pedidoModel: Model<PedidoDocument>,
    private historialService: HistorialService,
    private inventarioService: InventarioService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, request: Request) {
    const id = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    createPedidoDto.fecha_entrada = new Date(createPedidoDto.fecha_entrada);
    if (createPedidoDto.fecha_salida) {
      createPedidoDto.fecha_salida = new Date(createPedidoDto.fecha_salida);
    }

    createPedidoDto.medicamentos.forEach((medicamento) => {
      let totalLotes = 0;
      medicamento.inventario.lotes.forEach((lote) => {
        totalLotes += lote.cantidad;
      });

      if (totalLotes < medicamento.piezas) {
        createPedidoDto.medicamentosFaltantes = true;
      }
    });

    const pedido = await this.pedidoModel.create(createPedidoDto);

    const historial: CreateHistorialDto = {
      category: 'pedido',
      userId: id,
      action: 'crear',
      id_medicamento: pedido._id,
    };

    await this.historialService.create(historial);
  }

  findAll() {
    return this.pedidoModel
      .find()
      .populate({
        path: 'medicamentos.id_inventario',
      })
      .populate({
        path: 'medicamentos.inventario.id_medicamento',
      })
      .exec();
  }

  findOne(id: string): Promise<Pedido> {
    return this.pedidoModel
      .findOne({ _id: id })
      .populate({
        path: 'medicamentos.id_inventario',
      })
      .populate({
        path: 'medicamentos.inventario.id_medicamento',
      })
      .exec();
  }

  findOneNoPopulate(id: string): Promise<Pedido> {
    return this.pedidoModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto, request: Request) {
    const adapter = new JSONFile('db.json');
    const db = new Low(adapter);
    await db.read();
    db.data = updatePedidoDto;
    await db.write();

    const uid = (
      await getAuth().verifyIdToken(request.headers.authorization.split(' ')[1])
    ).uid;

    const oldPedido = await this.findOneNoPopulate(id);
    const pedidoTemp = await this.deleteOldLotesAndUpdateInventarios(
      oldPedido,
      updatePedidoDto,
      request,
    );

    pedidoTemp.medicamentos.forEach(async (medicamento, index) => {
      const inventario = await this.inventarioService.findOne(
        medicamento.id_inventario.toString(),
      );

      const oldMedicamento = oldPedido.medicamentos.find(
        (med) => med.id_inventario.toString() === medicamento.id_inventario,
      );

      medicamento.inventario.lotes.forEach((lote, indexLote) => {
        if (lote !== null) {
          inventario.lotes.find((lot) => (lot.lote = lote.lote)).cantidad -=
            lote.cantidad;
        }
      });

      if (oldMedicamento) {
        const dif = oldMedicamento.piezas - medicamento.piezas;
        inventario.piezas += dif;
      } else {
        inventario.piezas -= medicamento.piezas;
      }

      const inv: UpdateInventarioDto = {
        lotes: inventario.lotes,
        piezas: inventario.piezas,
      };

      await this.inventarioService.update(
        inventario._id.toString(),
        inv,
        request,
      );

      const historial: CreateHistorialDto = {
        category: 'inventario',
        userId: uid,
        action: 'actualizar',
        id_inventario: new mongoose.Types.ObjectId(inventario._id.toString()),
      };

      await this.historialService.create(historial);
    });

    await db.read();

    updatePedidoDto = db.data;

    updatePedidoDto.fecha_entrada = new Date(updatePedidoDto.fecha_entrada);
    if (updatePedidoDto.fecha_salida) {
      updatePedidoDto.fecha_salida = new Date(updatePedidoDto.fecha_salida);
    }

    updatePedidoDto.medicamentos.forEach((medicamento) => {
      let totalLotes = 0;
      medicamento.inventario.lotes.forEach((lote) => {
        totalLotes += lote.cantidad;
      });

      if (totalLotes < medicamento.piezas) {
        updatePedidoDto.medicamentosFaltantes = true;
      }
    });

    const pedido = await this.pedidoModel
      .updateOne({ _id: id }, updatePedidoDto)
      .exec();

    if (updatePedidoDto.completado && updatePedidoDto.completado === true) {
      const historial: CreateHistorialDto = {
        category: 'pedido',
        userId: uid,
        action: 'completar',
        id_medicamento: new mongoose.Types.ObjectId(id),
      };

      await this.historialService.create(historial);
    } else {
      const historial: CreateHistorialDto = {
        category: 'pedido',
        userId: uid,
        action: 'actualizar',
        id_medicamento: new mongoose.Types.ObjectId(id),
      };
      await this.historialService.create(historial);
    }
    return pedido;

    // console.log(
    //   'Pedido-------------------------------------------------------',
    // );

    // console.log(JSON.stringify(updatePedidoDto));

    // updatePedidoDto.medicamentos.forEach(async (medicamento) => {
    //   const inventario = await this.inventarioService.findOneNoPopulate(
    //     medicamento.id_inventario.toString(),
    //   );

    //   if (inventario) {
    //     medicamento.inventario.lotes.forEach((lote) => {
    //       inventario.lotes.find((lot) => lot.lote === lote.lote).cantidad -=
    //         lote.cantidad;
    //     });

    //     inventario.piezas -= medicamento.piezas;
    //     medicamento.id_inventario = inventario._id;

    //     const inv: UpdateInventarioDto = {
    //       lotes: inventario.lotes,
    //     };

    //     await this.inventarioService.update(inventario._id, inv, request);
    //   }
    // });
  }

  async deleteOldLotesAndUpdateInventarios(
    oldPedido: Pedido,
    pedidoTemp: UpdatePedidoDto,
    request: Request,
  ): Promise<UpdatePedidoDto> {
    return new Promise<UpdatePedidoDto>((resolve, reject) => {
      oldPedido.medicamentos.forEach(async (medicamento, index) => {
        const inventario = await this.inventarioService.findOne(
          medicamento.id_inventario.toString(),
        );

        const pedido = pedidoTemp.medicamentos.find(
          (med) => med.id_inventario === medicamento.id_inventario.toString(),
        );

        if (pedido === undefined || pedido.inventario.lotes.length === 0) {
          medicamento.inventario.lotes.forEach((lote) => {
            inventario.lotes.filter(
              (lo) => lo.lote === lote.lote,
            )[0].cantidad += lote.cantidad;
          });
        } else {
          medicamento.inventario.lotes.forEach((lote) => {
            const lotePedido = pedido.inventario.lotes.filter(
              (lo) => lo.lote === lote.lote,
            );
            let cantidad = 0;

            if (lotePedido.length === 0) {
              cantidad = lote.cantidad;
            } else {
              cantidad =
                lote.cantidad -
                pedido.inventario.lotes.filter((lo) => lo.lote === lote.lote)[0]
                  .cantidad;
            }

            inventario.lotes.filter(
              (lo) => lo.lote === lote.lote,
            )[0].cantidad += cantidad;
          });
        }
        const oldLotes = medicamento.inventario.lotes.filter(
          (med, indexLote) =>
            med.lote ===
            pedidoTemp.medicamentos[index].inventario.lotes[indexLote].lote,
        );

        pedidoTemp.medicamentos[index].inventario.lotes.forEach(
          (lote, indexLote) => {
            if (
              oldLotes.filter((oldLote) => oldLote.lote === lote.lote).length >
              0
            ) {
              delete pedidoTemp.medicamentos[index].inventario.lotes[indexLote];
            }
          },
        );
        // console.log(
        //   'Inventario-----------------------------------------------------------',
        // );
        const inventarioUpdate: UpdateInventarioDto = {
          lotes: inventario.lotes,
          piezas: inventario.piezas,
        };

        this.inventarioService.update(
          inventario._id.toString(),
          inventarioUpdate,
          request,
        );

        if (index === oldPedido.medicamentos.length - 1) {
          resolve(pedidoTemp);
        }
      });
    });
  }
  // remove(id: string) {
  //   return `This action removes a #${id} pedido`;
  // }
}
