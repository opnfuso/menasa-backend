import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PedidosStandbyDocument = Document & PedidosStandby;

class Inventario {
  @Prop({ required: true, type: Types.ObjectId })
  id: string;
}

class Medicamento {
  @Prop({ required: true })
  piezas: number;

  @Prop({ required: true })
  precio_maximo: number;

  @Prop({ required: true })
  precio_sugerido: number;

  @Prop({ required: true })
  descuento: number;

  @Prop({ required: true })
  precio_total: number;

  @Prop({ required: true })
  id_inventario: Array<Inventario>;
}

@Schema()
export class PedidosStandby {
  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true })
  fecha_entrada: Date;

  @Prop({ required: true })
  medicamentos: Array<Medicamento>;
}

export const PedidosStandbySchema =
  SchemaFactory.createForClass(PedidosStandby);
