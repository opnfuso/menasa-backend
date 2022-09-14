import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateMedicamentoDto {
  @IsInt()
  @Min(1)
  codigo_barras: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsString()
  @IsNotEmpty()
  compuesto_activo: string;

  @IsString()
  @IsNotEmpty()
  laboratorio: string;

  @IsOptional()
  @IsBoolean()
  hasInventory: boolean;
}
