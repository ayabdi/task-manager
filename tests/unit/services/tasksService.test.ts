import { createTask, getTasks, updateTask, deleteTask } from '@/services/taskService'
import { prismaMock } from '../../../jest.setup'

describe('Task Service', () => {
  describe('createTask', () => {
    it('should create a task with valid data', async () => {
      const taskData = {
        title: 'Sample Task',
        description: 'This is a sample task',
        status: 'BACKLOG',
        teamId: 'team-456'
      }

      prismaMock.task.create.mockResolvedValue({ id: 'test-123', ...taskData })

      const result = await createTask(taskData)

      expect(result).toEqual({ id: 'test-123', ...taskData })
    })

    it('should throw an error if title is missing', async () => {
      const taskData = {
        description: 'Task description',
        status: 'TODO',
        teamId: 'team-123'
      }
      await expect(createTask(taskData as any)).rejects.toThrow('Title is required')
    })

  })

  describe('getTasks', () => {
    it('should fetch tasks for a user', async () => {
      const tasks = [
        { id: 'task-1', title: 'Task 1', description: 'Desc 1', status: 'TODO' }
      ]
      prismaMock.task.findMany.mockResolvedValue(tasks)

      const result = await getTasks('user-123')

      expect(result).toEqual(tasks)
    })
  })

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updates = { title: 'Updated Task' }
      prismaMock.task.update.mockResolvedValue({ id: 'task-1', ...updates })

      const result = await updateTask('task-1', 'user-123', updates)

      expect(result).toEqual({ id: 'task-1', ...updates })
    })
  })

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = { id: 'task-1', title: 'Task 1' }
      prismaMock.task.delete.mockResolvedValue(task)

      const result = await deleteTask('task-1', 'user-123')

      expect(result).toEqual(task)
    })
  })
})