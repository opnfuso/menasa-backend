import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Medicamento } from 'src/medicamento/schema/medicamento.schema';
export type PedidoDocument = Document & Pedido;

// class InventarioSchema {
//   @Prop({ required: true, type: MSchema.Types.ObjectId, ref: Inventario.name })
//   id_inventario: Inventario;
// }

// class Medicamento {
//   @Prop({ required: true })
//   piezas: number;

//   @Prop({ required: true })
//   precio_maximo: number;

//   @Prop({ required: true })
//   precio_sugerido: number;

//   @Prop({ required: true })
//   descuento: number;

//   @Prop({ required: true })
//   precio_total: number;

//   @Prop({ required: true, type: MSchema.Types.ObjectId, ref: Inventario.name })
//   id_inventario: Inventario;
// }

// class Id_inventario {
//   id_inventario: MSchema.Types.ObjectId;
// }
class Lote {
  @Prop({ required: false, type: MSchema.Types.Date })
  fecha_vencimiento: Date;

  @Prop({ required: true, type: MSchema.Types.Date })
  fecha_ingreso: Date;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  lote: string;

  @Prop({ required: false, default: null })
  observaciones: string;
}

class Inventario {
  @Prop({ required: false })
  lotes: Array<Lote>;

  @Prop({ required: true })
  piezas: number;

  @Prop({ required: true, type: MSchema.Types.ObjectId, ref: Medicamento.name })
  id_medicamento: Medicamento;
}
@Schema()
export class Pedido {
  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true, default: Date.now, type: MSchema.Types.Date })
  fecha_entrada: Date;

  @Prop({ required: true, default: false })
  completado: boolean;

  @Prop({ required: false, default: null, type: MSchema.Types.Date })
  fecha_salida: Date;

  @Prop(
    raw([
      {
        piezas: { type: Number, required: true },
        precio_maximo: { type: Number, required: true },
        precio_sugerido: { type: Number, required: true },
        descuento: { type: Number, required: true },
        precio_total: { type: Number, required: true },
        id_inventario: {
          type: MSchema.Types.ObjectId,
          required: true,
          ref: Inventario.name,
        },
        inventario: {
          lotes: { type: Array<Lote>, required: true },
          piezas: { type: Number, required: true },
          id_medicamento: {
            required: true,
            type: MSchema.Types.ObjectId,
            ref: Medicamento.name,
          },
        },
      },
    ]),
  )
  medicamentos: Inventario[];
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
