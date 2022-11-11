import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findTaskById: jest.fn(),
});

const mockFlatUser = {
  username: 'fake_username',
  id: 'fake_user_id',
  password: 'fake_password',
};

const mockFlatTask = {
  id: 'fake_task_id',
  title: 'fake_task_title',
  description: 'fake_task_description',
  status: TaskStatus.OPEN,
};

const mockTask: Task = {
  ...mockFlatTask,
  user: mockFlatUser as User,
};

const mockTasks: Task[] = [mockTask];

const mockUser: User = {
  ...mockFlatUser,
  tasks: mockTasks,
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks()', () => {
    it('should return a result correclty', async () => {
      const expectedResult = 'someValue';
      tasksRepository.getTasks.mockResolvedValue(expectedResult);

      const result = await tasksService.getTasks(null, mockUser);

      expect(result).toEqual(expectedResult);
    });

    describe('getTaskById()', () => {
      it('should return a result correctly', async () => {
        tasksRepository.findTaskById.mockResolvedValue(mockTask);

        const result = await tasksService.getTaskById(
          mockFlatTask.id,
          mockUser,
        );

        expect(result).toEqual(mockTask);
      });

      it('should fail getting tasks', async () => {
        tasksRepository.findTaskById.mockResolvedValue(null);

        const runAsync = async () =>
          await tasksService.getTaskById(mockFlatTask.id, mockUser);

        expect(runAsync).rejects.toThrow(NotFoundException);
      });
    });
  });
});
