import { Task } from '../entities/Task';

export interface ITaskRepository {
  findById(id: string, userId: string): Promise<Task | null>;
  findAllByUser(userId: string): Promise<Task[]>;
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<Task>;
  delete(id: string, userId: string): Promise<void>;
}