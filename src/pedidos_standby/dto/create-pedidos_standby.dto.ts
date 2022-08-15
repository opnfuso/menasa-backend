import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  IsArray,
  IsISO8601,
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
  @ValidateNested({ each: true })
  @Type(() => Inventario)
  id_inventario: Array<Inventario>;
}

export class CreatePedidosStandbyDto {
  @IsNotEmpty()
  cliente: string;

  @IsISO8601()
  fecha_entrada: Date;

  @IsArray()
  @Type(() => Medicamento)
  medicamentos: Array<Medicamento>;
}
