/**
 * Represents the possible statuses a task can have.
 */
export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN PROGRESS',
  COMPLETE = 'COMPLETE'
}

/**
 * Represents a task within the application domain.
 */
export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public teamId: string
  ) {
    // Ensure that the title and teamId are provided
    if (!title) {
      throw new Error('Title is required')
    }
    if (!teamId) {
      throw new Error('Team ID is required')
    }
  }
}
