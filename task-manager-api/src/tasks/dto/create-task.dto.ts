import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean = false;

  @IsInt()
  userId: number;
}
