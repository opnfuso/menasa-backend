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
  create(@Body() createMedicamentoDto: CreateMedicamentoDto) {
    return this.medicamentoService.create(createMedicamentoDto);
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
  update(
    @Param('id') id: string,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto,
  ) {
    return this.medicamentoService.update(id, updateMedicamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicamentoService.remove(id);
  }
}
