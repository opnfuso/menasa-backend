import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PedidosRealizadosDocument = Document & PedidosRealizado;

@Schema()
export class PedidosRealizado {
  @Prop({ required: true, type: Types.ObjectId })
  id_pedido: string;

  @Prop({ required: true })
  fecha_salida: Date;
}

export const PedidosRealizadoShcema =
  SchemaFactory.createForClass(PedidosRealizado);
