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

  @Prop({ required: true })
  compuesto_activo: string;

  @Prop({ required: true })
  laboratorio: string;

  @Prop({ default: false })
  hasInventory: boolean;

  @Prop({ default: false })
  disabled: boolean;
}

export const MedicamentoSchema = SchemaFactory.createForClass(Medicamento);
