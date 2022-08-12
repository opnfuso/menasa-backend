import { Test, TestingModule } from '@nestjs/testing';
import { PedidosRealizadosController } from './pedidos_realizados.controller';
import { PedidosRealizadosService } from './pedidos_realizados.service';

describe('PedidosRealizadosController', () => {
  let controller: PedidosRealizadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosRealizadosController],
      providers: [PedidosRealizadosService],
    }).compile();

    controller = module.get<PedidosRealizadosController>(
      PedidosRealizadosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
