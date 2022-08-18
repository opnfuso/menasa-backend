import { IsInt, IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

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
}
