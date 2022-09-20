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
import { UpdateInventarioDto } from 'src/inventario/dto/update-inventario.dto';

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
  @Type(() => UpdateInventarioDto)
  @IsNotEmpty()
  inventario: UpdateInventarioDto;
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

  @IsOptional()
  @IsBoolean()
  medicamentosFaltantes: boolean;
}
