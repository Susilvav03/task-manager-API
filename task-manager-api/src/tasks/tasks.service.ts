import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
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

  // 🧱 Crear tarea
  async create(data: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepository.create(data);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la tarea');
    }
  }

  // 📋 Obtener todas las tareas
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['user'],
      order: { id: 'ASC' },
    });
  }

  // 🔍 Obtener una tarea por ID
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return task;
  }

  // ✏️ Actualizar tarea
  async update(id: number, data: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, data);
    return this.taskRepository.save(task);
  }

  // ❌ Eliminar tarea
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  // 📋 Obtener todas las tareas de un usuario
  async findByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // ✅ Cambiar estado (completar tarea)
  async toggleStatus(id: number): Promise<Task> {
    const task = await this.findOne(id);
    task.isCompleted = !task.isCompleted;
    return this.taskRepository.save(task);
  }
}
