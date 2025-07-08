import { PrismaClient, Task } from "@prisma/client";
import { ITasksRepository } from "./tasks-repository-interface";

const prisma = new PrismaClient();

export class TasksRepository implements ITasksRepository {
  async create(taskData: Omit<Task, "id">): Promise<Task> {
    const newTask = await prisma.task.create({
      data: taskData,
    });

    return newTask;
  }

  async findAllByUserId(userId: string): Promise<Task[]> {
    return await prisma.task.findMany({
      where: { userId },
    });
  }

  async findById(id: string): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatedData: Partial<Task>): Promise<Task> {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: updatedData,
    });

    return updatedTask;
  }

  async delete(id: string): Promise<Task> {
    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return deletedTask;
  }
}
