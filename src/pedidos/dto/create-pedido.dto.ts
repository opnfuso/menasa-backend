import { Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

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

@Schema()
export class CreatePedidoDto {
  @IsNotEmpty()
  cliente: string;

  @IsArray()
  @Type(() => Medicamento)
  medicamentos: Array<Medicamento>;
}
