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

  // 🧱 Crear tarea
  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  // 📋 Listar todas las tareas
  @Get()
  async findAll(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const user = req.user as any;
    return this.tasksService.findPaginatedByUser(user.userId, Number(page), Number(limit));
  }

  // 🔍 Buscar una tarea
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  // 🔍 Buscar tareas por usuario
  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tasksService.findByUser(userId);
  }

  // ✏️ Actualizar tarea
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, data);
  }

  // ✅ Cambiar estado de tarea
  @Patch(':id/toggle')
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.toggleStatus(id);
  }

  // ❌ Eliminar tarea
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
