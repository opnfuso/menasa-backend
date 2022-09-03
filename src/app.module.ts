import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicamentoModule } from './medicamento/medicamento.module';
import { InventarioModule } from './inventario/inventario.module';
import { PedidoModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { HistorialModule } from './historial/historial.module';

ConfigModule.forRoot({
  envFilePath: `.env${
    process.env.NODE_ENV === 'production' ? '' : '.' + process.env.NODE_ENV
  }`,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV === 'production' ? '' : '.' + process.env.NODE_ENV
      }`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    MedicamentoModule,
    InventarioModule,
    PedidoModule,
    AuthModule,
    UserModule,
    ChatModule,
    HistorialModule,
  ],
})
export class AppModule {}
