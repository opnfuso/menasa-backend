import { Module } from '@nestjs/common';
import { PedidosStandbyService } from './pedidos_standby.service';
import { PedidosStandbyController } from './pedidos_standby.controller';

@Module({
  controllers: [PedidosStandbyController],
  providers: [PedidosStandbyService],
})
export class PedidosStandbyModule {}
