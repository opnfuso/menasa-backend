import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicamentoService } from './medicamento.service';
import { MedicamentoController } from './medicamento.controller';
import { Medicamento, MedicamentoSchema } from './schema/medicamento.schema';
import { HistorialService } from 'src/historial/historial.service';
import {
  Historial,
  HistorialSchema,
} from 'src/historial/schema/historial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicamento.name, schema: MedicamentoSchema },
    ]),
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
    ]),
  ],
  controllers: [MedicamentoController],
  providers: [MedicamentoService, HistorialService],
})
export class MedicamentoModule {}
