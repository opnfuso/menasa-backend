import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidosSchema } from './schema/pedido.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PedidosModule.name,
        schema: PedidosSchema,
      },
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
