import { Request, Response } from "express";
import { TasksService } from "../services/tasks-service";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks-schema";
import { tasksService } from "../container";

export class TasksController {
  private service: TasksService;

  constructor() {
    this.service = tasksService;
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const userId = req.user!.id;

    const tasks = await this.service.getAllByUserId(userId);

    return res.json({ tasks });
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const userId = req.user!.id;
    const taskId = req.params.id;

    const task = await this.service.getById(userId, taskId);

    return res.json({ task });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const parsedBody = createTaskSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.flatten().fieldErrors);
    }

    const userId = req.user!.id;
    const created = await this.service.create(userId, parsedBody.data);
    return res.status(201).json({ created });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user!.id;
    const taskId = req.params.id;

    const parsedBody = updateTaskSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.flatten().fieldErrors);
    }

    const updated = await this.service.update(userId, taskId, parsedBody.data);
    return res.json({ updated });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.user!.id;
    const taskId = req.params.id;

    const deleted = await this.service.delete(userId, taskId);
    return res.status(200).json({ deleted });
  }
}
