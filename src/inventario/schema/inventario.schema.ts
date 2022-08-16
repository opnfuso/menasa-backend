import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MSchema } from 'mongoose';
import { Medicamento } from 'src/medicamento/schema/medicamento.schema';

export type InventarioDocument = Document & Inventario;

class Lote {
  @Prop({ required: false })
  fecha_vencimiento: Date;

  @Prop({ required: true, default: Date.now })
  fecha_ingreso: Date;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  lote: string;
}

@Schema()
export class Inventario {
  @Prop({ required: false, default: null })
  observaciones: string;

  @Prop({ required: true })
  lotes: Array<Lote>;

  @Prop({ required: true })
  piezas: number;

  @Prop({ required: true, type: MSchema.Types.ObjectId, ref: Medicamento.name })
  id_medicamento: Medicamento;
}

export const InventarioSchema = SchemaFactory.createForClass(Inventario);
