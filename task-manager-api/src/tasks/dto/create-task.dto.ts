import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean = false;

  @IsInt()
  userId: number;
}
