import { Test, TestingModule } from '@nestjs/testing';
import { PedidosStandbyController } from './pedidos_standby.controller';
import { PedidosStandbyService } from './pedidos_standby.service';

describe('PedidosStandbyController', () => {
  let controller: PedidosStandbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosStandbyController],
      providers: [PedidosStandbyService],
    }).compile();

    controller = module.get<PedidosStandbyController>(PedidosStandbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
