import { Task, TaskStatus } from '../../../domain/entities/Task'
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'
import { v4 as uuidv4 } from 'uuid'

/**
 * Data Transfer Object for creating a task.
 */
interface CreateTaskDTO {
  title: string
  description?: string
  status?: TaskStatus
  teamId: string
}

/**
 * Use case for creating a new task.
 */
export class CreateTaskUseCase {
  // Receive the task repository via dependency injection
  constructor(private taskRepository: ITaskRepository) {}

  /**
   * Executes the use case.
   * @param taskData The data required to create a task.
   * @returns The created Task entity.
   */
  async execute(taskData: CreateTaskDTO): Promise<Task> {
    // Generate a unique ID for the new task
    const task = new Task(
      uuidv4(),
      taskData.title,
      taskData.description || null,
      taskData.status || TaskStatus.BACKLOG,
      taskData.teamId
    )

    // Save the task using the repository
    return this.taskRepository.create(task)
  }
}