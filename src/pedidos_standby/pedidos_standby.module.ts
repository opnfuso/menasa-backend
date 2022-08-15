import { Module } from '@nestjs/common';
import { PedidosStandbyService } from './pedidos_standby.service';
import { PedidosStandbyController } from './pedidos_standby.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PedidosStandby,
  PedidosStandbySchema,
} from './schema/pedidos_standby.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PedidosStandby.name, schema: PedidosStandbySchema },
    ]),
  ],
  controllers: [PedidosStandbyController],
  providers: [PedidosStandbyService],
})
export class PedidosStandbyModule {}
