import { Task, TaskStatus } from '../../../domain/entities/Task';
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';

interface UpdateTaskDTO {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

/**
 * Use case for updating an existing task.
 */
export class UpdateTaskUseCase {
  /**
   * Constructs a new UpdateTaskUseCase instance.
   * @param taskRepository - The repository instance for accessing tasks.
   */
  constructor(private taskRepository: ITaskRepository) {}

  /**
   * Executes the use case to update a task.
   * @param taskData - The data for updating the task.
   * @returns A promise that resolves to the updated Task entity.
   * @throws Will throw an error if the task is not found.
   */
  async execute(taskData: UpdateTaskDTO): Promise<Task> {
    // Retrieve the existing task to ensure it exists and belongs to the user
    const existingTask = await this.taskRepository.findById(taskData.id, taskData.userId);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Update task properties if they are provided
    existingTask.title = taskData.title ?? existingTask.title;
    existingTask.description = taskData.description ?? existingTask.description;
    existingTask.status = taskData.status ?? existingTask.status;

    // Save the updated task using the repository
    return this.taskRepository.update(existingTask);
  }
}