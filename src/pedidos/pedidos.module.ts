import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './schema/pedido.schema';
import { HistorialService } from 'src/historial/historial.service';
import {
  Historial,
  HistorialSchema,
} from 'src/historial/schema/historial.schema';
import { InventarioService } from 'src/inventario/inventario.service';
import {
  Inventario,
  InventarioSchema,
} from 'src/inventario/schema/inventario.schema';
import {
  Medicamento,
  MedicamentoSchema,
} from 'src/medicamento/schema/medicamento.schema';
import { MedicamentoService } from 'src/medicamento/medicamento.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pedido.name,
        schema: PedidoSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
    ]),
    MongooseModule.forFeature([
      { name: Inventario.name, schema: InventarioSchema },
    ]),
    MongooseModule.forFeature([
      { name: Medicamento.name, schema: MedicamentoSchema },
    ]),
  ],
  controllers: [PedidosController],
  providers: [
    PedidosService,
    HistorialService,
    InventarioService,
    MedicamentoService,
  ],
})
export class PedidoModule {}
