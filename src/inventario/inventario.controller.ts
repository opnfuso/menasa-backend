import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  async create(@Body() createInventarioDto: CreateInventarioDto) {
    console.log(createInventarioDto.id_medicamento);
    return await this.inventarioService.create(createInventarioDto);
  }

  @Get()
  async findAll() {
    return await this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventarioDto: UpdateInventarioDto,
  ) {
    return this.inventarioService.update(id, updateInventarioDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.inventarioService.remove(+id);
  // }
}
