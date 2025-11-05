import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';
import { Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // 📋 Listar tareas paginadas del usuario autenticado
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const user = req.user as any;
    return this.tasksService.findPaginatedByUser(
      user.userId,
      Number(page),
      Number(limit),
    );
  }

  // 🧱 Crear tarea
  @Post()
  create(@Req() req: Request, @Body() data: CreateTaskDto) {
    const user = req.user as any;
    return this.tasksService.create({ ...data, userId: user.userId });
  }

  // ✏️ Actualizar tarea (solo la suya)
  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDto,
  ) {
    const user = req.user as any;
    return this.tasksService.update(id, user.userId, data);
  }

  // ❌ Eliminar tarea (solo la suya)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req.user as any;
    return this.tasksService.remove(id, user.userId);
  }

  // ✅ Cambiar estado (solo la suya)
  @Patch(':id/toggle')
  toggle(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req.user as any;
    return this.tasksService.toggleStatus(id, user.userId);
  }
}

