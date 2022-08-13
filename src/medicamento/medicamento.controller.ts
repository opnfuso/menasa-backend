import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Controller('medicamento')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @Post()
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto) {
    const medicamento = await this.medicamentoService.create(
      createMedicamentoDto,
    );
    return medicamento;
  }

  @Get()
  async findAll() {
    const medicamentos = await this.medicamentoService.findAll();
    return medicamentos;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const medicamento = await this.medicamentoService.findOne(id);
    return medicamento;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto,
  ) {
    const medicamento = await this.medicamentoService.update(
      id,
      updateMedicamentoDto,
    );
    return medicamento;
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.medicamentoService.remove(id);
  // }
}
