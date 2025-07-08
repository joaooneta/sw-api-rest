import { NotFoundError } from "../errors/not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { Task } from "../models/task";
import { ITasksRepository } from "../repositories/tasks/tasks-repository-interface";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks-schema";
import { z } from "zod";

type createTaskData = z.infer<typeof createTaskSchema>;
type updateTaskData = z.infer<typeof updateTaskSchema>;

export class TasksService {
  private repository: ITasksRepository;

  constructor(repository: ITasksRepository) {
    this.repository = repository;
  }

  async create(userId: string, data: createTaskData): Promise<Task> {
    const { title, description, dueDate } = data;

    const created = await this.repository.create({
      title,
      description,
      dueDate: new Date(dueDate),
      completed: false,
      userId,
    });

    return created;
  }

  async getAllByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.repository.findAllByUserId(userId);
    return tasks;
  }

  async getById(userId: string, taskId: string): Promise<Task> {
    const task = await this.repository.findById(taskId);

    if (!task) throw new NotFoundError("Task not found.");

    if (task.userId !== userId)
      throw new UnauthorizedError("This task is not yours");

    return task;
  }

  async update(
    userId: string,
    taskId: string,
    data: updateTaskData
  ): Promise<Task> {
    const task = await this.repository.findById(taskId);

    if (!task) throw new NotFoundError("Task not found.");

    if (task.userId !== userId)
      throw new UnauthorizedError("This task is not yours");

    const { dueDate, completed, ...d } = data;

    const updated = await this.repository.update(taskId, {
      ...d,
      completed: typeof completed === "boolean" ? completed : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return updated;
  }

  async delete(userId: string, taskId: string): Promise<Task> {
    const task = await this.repository.findById(taskId);

    if (!task) throw new NotFoundError("Task not found.");

    if (task.userId !== userId)
      throw new UnauthorizedError("This task is not yours");

    const deleted = await this.repository.delete(taskId);

    return deleted;
  }
}
