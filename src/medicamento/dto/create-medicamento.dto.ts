import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMedicamentoDto {
  @IsInt()
  @Min(1)
  codigo_barras: number;

  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  precio: number;
}
