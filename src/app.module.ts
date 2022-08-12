import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicamentoModule } from './medicamento/medicamento.module';
import { InventarioModule } from './inventario/inventario.module';
import { PedidosRealizadosModule } from './pedidos_realizados/pedidos_realizados.module';
import { PedidosStandbyModule } from './pedidos_standby/pedidos_standby.module';

ConfigModule.forRoot();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    MedicamentoModule,
    InventarioModule,
    PedidosRealizadosModule,
    PedidosStandbyModule,
  ],
})
export class AppModule {}
