import { Module } from '@nestjs/common';
import { PedidosRealizadosService } from './pedidos_realizados.service';
import { PedidosRealizadosController } from './pedidos_realizados.controller';

@Module({
  controllers: [PedidosRealizadosController],
  providers: [PedidosRealizadosService],
})
export class PedidosRealizadosModule {}
