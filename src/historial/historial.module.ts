import { Module } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { Historial, HistorialSchema } from './schema/historial.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
    ]),
  ],
  controllers: [HistorialController],
  providers: [HistorialService],
})
export class HistorialModule {}
