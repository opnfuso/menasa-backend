import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Medicamento } from 'src/medicamento/schema/medicamento.schema';

export type InventarioDocument = Document & Inventario;

class Lote {
  @Prop({ required: false, type: MSchema.Types.Date })
  fecha_vencimiento: Date;

  @Prop({ required: true, default: Date.now, type: MSchema.Types.Date })
  fecha_ingreso: Date;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  lote: string;

  @Prop({ required: false, default: null })
  observaciones: string;
}

@Schema()
export class Inventario {
  @Prop({ required: true })
  lotes: Array<Lote>;

  @Prop({ required: true })
  piezas: number;

  @Prop({ required: true, type: MSchema.Types.ObjectId, ref: Medicamento.name })
  id_medicamento: Medicamento;
}

export const InventarioSchema = SchemaFactory.createForClass(Inventario);
