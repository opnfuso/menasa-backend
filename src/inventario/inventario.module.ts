import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Inventario, InventarioSchema } from './schema/inventario.schema';
import { MedicamentoService } from 'src/medicamento/medicamento.service';
import {
  Medicamento,
  MedicamentoSchema,
} from 'src/medicamento/schema/medicamento.schema';
import { HistorialService } from 'src/historial/historial.service';
import {
  Historial,
  HistorialSchema,
} from 'src/historial/schema/historial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventario.name, schema: InventarioSchema },
    ]),
    MongooseModule.forFeature([
      { name: Medicamento.name, schema: MedicamentoSchema },
    ]),
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
    ]),
  ],
  controllers: [InventarioController],
  providers: [InventarioService, MedicamentoService, HistorialService],
})
export class InventarioModule {}
