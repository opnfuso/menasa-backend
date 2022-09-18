import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateHistorialDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsOptional()
  @IsMongoId()
  id_medicamento?: mongoose.Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  id_inventario?: mongoose.Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  id_pedido?: mongoose.Types.ObjectId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id_user?: string;
}
