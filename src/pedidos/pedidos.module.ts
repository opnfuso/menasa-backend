import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './schema/pedido.schema';
import { HistorialService } from 'src/historial/historial.service';
import {
  Historial,
  HistorialSchema,
} from 'src/historial/schema/historial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pedido.name,
        schema: PedidoSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService, HistorialService],
})
export class PedidoModule {}
