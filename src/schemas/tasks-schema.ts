import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().uuid("Task ID must be a valid UUID."),

  title: z
    .string()
    .min(10, "Title must have at least 10 characters")
    .max(50, "Title must have at most 50 characters"),

  description: z
    .string()
    .min(10, "Description must have at least 10 characters")
    .max(100, "Description must have at most 100 characters"),

  completed: z.boolean(),

  dueDate: z.string().datetime("dueDate must be a valid ISO datetime string"),

  userId: z.string().uuid("userId must be a valid UUID"),
});

export const createTaskSchema = taskSchema.omit({
  id: true,
  completed: true,
  userId: true,
});

export const updateTaskSchema = taskSchema
  .omit({ id: true, userId: true })
  .partial();
