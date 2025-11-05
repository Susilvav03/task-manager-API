import { IsOptional, IsBoolean, IsString, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El título no puede exceder los 100 caracteres' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
