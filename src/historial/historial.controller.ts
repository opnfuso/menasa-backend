import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { UpdateHistorialDto } from './dto/update-historial.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Post()
  create(@Body() createHistorialDto: CreateHistorialDto) {
    return this.historialService.create(createHistorialDto);
  }

  // @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.historialService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHistorialDto: UpdateHistorialDto) {
  //   return this.historialService.update(+id, updateHistorialDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.historialService.remove(+id);
  // }
}
