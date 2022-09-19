import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Inventario } from 'src/inventario/schema/inventario.schema';

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

  @IsMongoId()
  id_inventario: string;

  @IsObject()
  @Type(() => Inventario)
  @IsNotEmpty()
  inventario: Inventario;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  cliente: string;

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
