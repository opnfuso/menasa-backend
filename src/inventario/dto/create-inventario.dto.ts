import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  IsISO8601,
  ValidateNested,
} from 'class-validator';

class Lote {
  @IsISO8601()
  fecha_vencimiento: Date;

  @IsISO8601()
  fecha_ingreso: Date;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsString()
  @IsNotEmpty()
  lote: string;
}
export class CreateInventarioDto {
  @IsString()
  @IsNotEmpty()
  observaciones: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Lote)
  lotes: Array<Lote>;

  @IsInt()
  @Min(1)
  piezas: number;

  @IsString()
  @IsNotEmpty()
  id_medicamento: string;
}
