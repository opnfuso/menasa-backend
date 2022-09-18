import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class Medicamento {
  @IsInt()
  @Min(1)
  piezas: number;

  @IsInt()
  @Min(0)
  descuento: number;

  @IsNumber()
  precio_maximo: number;

  @IsNumber()
  precio_sugerido: number;

  @IsNumber()
  precio_total: number;

  @IsString()
  @IsNotEmpty()
  id_inventario: string;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  cliente: string;

  @IsOptional()
  @IsDateString()
  fecha_entrada: Date;

  @IsOptional()
  @IsDateString()
  fecha_salida: Date;

  @IsOptional()
  @IsBoolean()
  completado: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Medicamento)
  medicamentos: Array<Medicamento>;
}
