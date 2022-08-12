import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicamentoDocument = Document & Medicamento;

@Schema()
export class Medicamento {
  @Prop({ required: true })
  codigo_barras: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  precio: number;
}

export const MedicamentoSchema = SchemaFactory.createForClass(Medicamento);
