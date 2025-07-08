import { Task } from "../../models/task";

export interface ITasksRepository {
  findAllByUserId: (userId: string) => Promise<Task[]>;
  findById: (id: string) => Promise<Task | null>;
  create: (taskDate: Omit<Task, "id">) => Promise<Task>;
  update: (id: string, updatedData: Partial<Task>) => Promise<Task>;
  delete: (id: string) => Promise<Task>;
}
