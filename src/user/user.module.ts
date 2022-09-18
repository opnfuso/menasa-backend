import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialService } from 'src/historial/historial.service';
import {
  Historial,
  HistorialSchema,
} from 'src/historial/schema/historial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Historial.name, schema: HistorialSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, HistorialService],
})
export class UserModule {}
