import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class Inventario {
  @IsNotEmpty()
  id: string;
}

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

  @IsArray()
  @Type(() => Inventario)
  id_inventario: Array<Inventario>;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  cliente: string;

  @IsOptional()
  @IsDateString()
  fecha_salida: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Medicamento)
  medicamentos: Array<Medicamento>;
}
