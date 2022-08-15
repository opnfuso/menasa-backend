import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InventarioDocument = Document & Inventario;

class Lote {
  @Prop({ required: true })
  fecha_vencimiento: Date;

  @Prop({ required: true })
  fecha_ingreso: Date;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  lote: string;
}

@Schema()
export class Inventario {
  @Prop({ required: true })
  fecha_ingreso: Date;

  @Prop({ required: false })
  observaciones: string;

  @Prop({ required: true })
  lotes: Array<Lote>;

  @Prop({ required: true })
  piezas: number;

  @Prop({ required: true, type: Types.ObjectId })
  id_medicamento: string;
}

export const InventarioSchema = SchemaFactory.createForClass(Inventario);
