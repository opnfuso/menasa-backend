import { Test, TestingModule } from '@nestjs/testing';
import { PedidosStandbyService } from './pedidos_standby.service';

describe('PedidosStandbyService', () => {
  let service: PedidosStandbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosStandbyService],
    }).compile();

    service = module.get<PedidosStandbyService>(PedidosStandbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
