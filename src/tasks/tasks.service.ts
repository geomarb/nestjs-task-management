import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TasksRepository)
    private readonly taskRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findTaskById(id, user);

    this.#throwIfTaskIdNotFound(id, !!found);

    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const found = await this.taskRepository.deleteTask(id, user);

    this.#throwIfTaskIdNotFound(id, found);
  }

  #throwIfTaskIdNotFound(id: string, found: boolean) {
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    const task = await this.getTaskById(id, user);

    task.status = status;

    return this.taskRepository.saveTask(task);
  }
}
