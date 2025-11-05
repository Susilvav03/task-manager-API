import { Injectable, NotFoundException, ForbiddenException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findPaginatedByUser(userId: number, page = 1, limit = 10) {
  const [data, total] = await this.taskRepository.findAndCount({
    where: { userId },
    order: { createdAt: 'DESC' },
    skip: (page - 1) * limit,
    take: limit,
  });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }


  // ✅ Validar propiedad de la tarea
  private async findOwnedTask(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) throw new ForbiddenException('No tienes permiso para acceder a esta tarea');
    return task;
  }

  // 🧱 Crear tarea
  async create(data: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }

  // ✏️ Actualizar tarea
  async update(id: number, userId: number, data: Partial<Task>): Promise<Task> {
    const task = await this.findOwnedTask(id, userId);
    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  // ✅ Cambiar estado
  async toggleStatus(id: number, userId: number): Promise<Task> {
    const task = await this.findOwnedTask(id, userId);
    task.isCompleted = !task.isCompleted;
    return this.taskRepository.save(task);
  }

  // ❌ Eliminar tarea
  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOwnedTask(id, userId);
    await this.taskRepository.remove(task);
  }
}
