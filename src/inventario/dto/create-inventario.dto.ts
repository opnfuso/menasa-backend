import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
  IsMongoId,
  IsOptional,
  IsDateString,
} from 'class-validator';
import mongoose from 'mongoose';

class Lote {
  @IsDateString()
  fecha_vencimiento: Date;

  @IsDateString()
  fecha_ingreso: Date;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  lote: string;

  @IsOptional()
  @IsString()
  observaciones: string;
}
export class CreateInventarioDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Lote)
  lotes: Array<Lote>;

  @IsInt()
  @Min(1)
  piezas: number;

  @IsMongoId()
  @IsNotEmpty()
  id_medicamento: mongoose.Types.ObjectId;
}
