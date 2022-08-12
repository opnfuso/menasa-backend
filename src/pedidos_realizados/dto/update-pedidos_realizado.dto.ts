import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidosRealizadoDto } from './create-pedidos_realizado.dto';

export class UpdatePedidosRealizadoDto extends PartialType(
  CreatePedidosRealizadoDto,
) {}
