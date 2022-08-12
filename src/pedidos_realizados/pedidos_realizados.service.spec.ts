import { Test, TestingModule } from '@nestjs/testing';
import { PedidosRealizadosService } from './pedidos_realizados.service';

describe('PedidosRealizadosService', () => {
  let service: PedidosRealizadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidosRealizadosService],
    }).compile();

    service = module.get<PedidosRealizadosService>(PedidosRealizadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
