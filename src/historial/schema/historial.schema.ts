import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Inventario } from 'src/inventario/schema/inventario.schema';
import { Medicamento } from 'src/medicamento/schema/medicamento.schema';
import { Pedido } from 'src/pedidos/schema/pedido.schema';

export type HistorialDocument = Document & Historial;

@Schema()
export class Historial {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true, default: Date.now, type: MSchema.Types.Date })
  createdAt: Date;

  @Prop({
    required: false,
    type: MSchema.Types.ObjectId,
    ref: Medicamento.name,
  })
  id_medicamento: Medicamento;

  @Prop({
    required: false,
    type: MSchema.Types.ObjectId,
    ref: Inventario.name,
  })
  id_inventario: Inventario;

  @Prop({
    required: false,
    type: MSchema.Types.ObjectId,
    ref: Pedido.name,
  })
  id_pedido: Pedido;
}

export const HistorialSchema = SchemaFactory.createForClass(Historial);
