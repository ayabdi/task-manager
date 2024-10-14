import { ITaskRepository } from '../../../domain/repositories/ITaskRepository'

interface DeleteTaskDTO {
  id: string
  userId: string
}

/**
 * Use case for deleting a task.
 */
export class DeleteTaskUseCase {
  /**
   * Constructs a new DeleteTaskUseCase instance.
   * @param taskRepository - The repository instance for accessing tasks.
   */
  constructor(private taskRepository: ITaskRepository) {}

  /**
   * Executes the use case to delete a task.
   * @param params - The parameters required to delete a task.
   * @param params.id - The ID of the task to delete.
   * @param params.userId - The ID of the user requesting the deletion.
   * @returns A promise that resolves when the task has been deleted.
   * @throws Will throw an error if the task is not found.
   */
  async execute({ id, userId }: DeleteTaskDTO): Promise<void> {
    // Retrieve the existing task to ensure it exists and belongs to the user
    const existingTask = await this.taskRepository.findById(id, userId)
    if (!existingTask) {
      throw new Error('Task not found')
    }

    // Delete the task using the repository
    await this.taskRepository.delete(id, userId)
  }
}