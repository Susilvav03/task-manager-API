import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor( @InjectRepository(Task) private taskRepository: Repository<Task> ) {}

  findAll() {
    return this.taskRepository.find();
  }

  create(data: Partial<Task>) {
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }
}
