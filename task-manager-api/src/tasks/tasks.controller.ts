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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tareas paginadas del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de tareas devuelta correctamente' })
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

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada correctamente' })
  create(@Req() req: Request, @Body() data: CreateTaskDto) {
    const user = req.user as any;
    return this.tasksService.create({ ...data, userId: user.userId });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea existente' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada correctamente' }) 
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDto,
  ) {
    const user = req.user as any;
    return this.tasksService.update(id, user.userId, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea existente' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada correctamente' })
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req.user as any;
    return this.tasksService.remove(id, user.userId);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Alternar el estado de una tarea' })
  @ApiResponse({ status: 200, description: 'Estado de la tarea alternado correctamente' })
  toggle(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const user = req.user as any;
    return this.tasksService.toggleStatus(id, user.userId);
  }
}

