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
  UseGuards,
  Req,
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('medicamento')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @UseGuards(AuthGuard('firebase-jwt'))
  @Post()
  async create(
    @Body() createMedicamentoDto: CreateMedicamentoDto,
    @Req() request: Request,
  ) {
    return await this.medicamentoService.create(createMedicamentoDto, request);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
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

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  async findAll() {
    return await this.medicamentoService.findAll();
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicamentoService.findOne(id);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicamentoDto: UpdateMedicamentoDto,
    @Req() request: Request,
  ) {
    return await this.medicamentoService.update(
      id,
      updateMedicamentoDto,
      request,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.medicamentoService.remove(id);
  // }
}
