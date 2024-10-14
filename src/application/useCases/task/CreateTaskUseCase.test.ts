import { CreateTaskUseCase } from '@/application/useCases/task/CreateTaskUseCase';
import { TaskStatus } from '@/domain/entities/Task';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';

// Mock implementations
const mockTaskRepository: ITaskRepository = {
  findById: jest.fn(),
  findAllByUser: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;

  beforeEach(() => {
    createTaskUseCase = new CreateTaskUseCase(mockTaskRepository);
  });

  it('should create a new task with valid data', async () => {
    // Arrange
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      status: TaskStatus.TODO,
      teamId: 'team-123',
    };

    // Mock the repository's create method to return the task
    (mockTaskRepository.create as jest.Mock).mockResolvedValue({
      id: 'task-123',
      ...taskData,
    });

    // Act
    const result = await createTaskUseCase.execute(taskData);

    // Assert
    expect(mockTaskRepository.create).toHaveBeenCalledWith(expect.objectContaining(taskData));
    expect(result).toEqual(expect.objectContaining(taskData));
  });

  it('should throw an error if title is missing', async () => {
    // Arrange
    const taskData = {
      title: '',
      description: 'This is a test task',
      status: TaskStatus.TODO,
      teamId: 'team-123',
    };

    // Act & Assert
    await expect(createTaskUseCase.execute(taskData)).rejects.toThrow('Title is required');
  });

  it('should default status to BACKLOG if not provided', async () => {
    // Arrange
    const taskData = {
      title: 'Test Task',
      description: 'This is a test task',
      teamId: 'team-123',
    };

    // Mock the repository's create method to return the task
    (mockTaskRepository.create as jest.Mock).mockResolvedValue({
      id: 'task-123',
      ...taskData,
      status: TaskStatus.BACKLOG,
    });

    // Act
    const result = await createTaskUseCase.execute(taskData);

    // Assert
    expect(mockTaskRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...taskData,
        status: TaskStatus.BACKLOG,
      })
    );
    expect(result.status).toBe(TaskStatus.BACKLOG);
  });
});