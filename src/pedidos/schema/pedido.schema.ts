import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Inventario } from 'src/inventario/schema/inventario.schema';

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

class Id_inventario {
  id_inventario: MSchema.Types.ObjectId;
}

@Schema()
export class Pedido {
  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true, default: Date.now })
  fecha_entrada: Date;

  @Prop({ required: true, default: false })
  completado: boolean;

  @Prop({ required: false, default: null })
  fecha_salida: Date;

  @Prop(
    raw([
      {
        piezas: { type: Number, required: true },
        precio_maximo: { type: Number, required: true },
        precio_sugerido: { type: Number, required: true },
        descuento: { type: Number, required: true },
        precio_total: { type: Number, required: true },
        id_inventario: [
          {
            type: MSchema.Types.ObjectId,
            required: true,
            ref: Inventario.name,
          },
        ],
      },
    ]),
  )
  medicamentos: Inventario[];
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
