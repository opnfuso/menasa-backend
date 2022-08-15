import { Module } from '@nestjs/common';
import { PedidosRealizadosService } from './pedidos_realizados.service';
import { PedidosRealizadosController } from './pedidos_realizados.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PedidosRealizado,
  PedidosRealizadoShcema,
} from './schema/pedidos_realizado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PedidosRealizado.name, schema: PedidosRealizadoShcema },
    ]),
  ],
  controllers: [PedidosRealizadosController],
  providers: [PedidosRealizadosService],
})
export class PedidosRealizadosModule {}
