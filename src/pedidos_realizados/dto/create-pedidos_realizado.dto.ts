import { Type } from 'class-transformer';
import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreatePedidosRealizadoDto {
  @IsNotEmpty()
  id_pedido: string;

  @IsISO8601()
  fecha_salida: Date;
}
