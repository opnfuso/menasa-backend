import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Controller('medicamento')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @Post()
  async create(@Body() createMedicamentoDto: CreateMedicamentoDto) {
    return await this.medicamentoService.create(createMedicamentoDto);
  }

  @Get('findByFilter')
  async findByFilter(@Query() query: any) {
    const medicamento = await this.medicamentoService.findByFilter(query);

    if (medicamento === undefined) {
      throw new HttpException(
        'No se existe ese parametro de filtro',
        HttpStatus.BAD_REQUEST,
      );
    }

    return medicamento;
  }

  @Get()
  async findAll() {
    return await this.medicamentoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicamentoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto,
  ) {
    return await this.medicamentoService.update(id, updateMedicamentoDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.medicamentoService.remove(id);
  // }
}
