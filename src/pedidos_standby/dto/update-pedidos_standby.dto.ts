import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidosStandbyDto } from './create-pedidos_standby.dto';

export class UpdatePedidosStandbyDto extends PartialType(
  CreatePedidosStandbyDto,
) {}
