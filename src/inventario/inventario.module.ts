import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Inventario, InventarioSchema } from './schema/inventario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inventario.name, schema: InventarioSchema },
    ]),
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}
