import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicamentoService } from './medicamento.service';
import { MedicamentoController } from './medicamento.controller';
import { Medicamento, MedicamentoSchema } from './schema/medicamento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicamento.name, schema: MedicamentoSchema },
    ]),
  ],
  controllers: [MedicamentoController],
  providers: [MedicamentoService],
})
export class MedicamentoModule {}
