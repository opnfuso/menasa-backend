import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  IsDate,
  IsArray,
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
  id_inventario: Array<Inventario>;
}

export class CreatePedidosStandbyDto {
  @IsNotEmpty()
  cliente: string;

  @IsDate()
  fecha_entrada: Date;

  @IsArray()
  medicamento: Array<Medicamento>;
}
