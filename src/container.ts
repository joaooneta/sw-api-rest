import { UsersRepository } from "./repositories/users/users-repository-prisma";
import { UsersService } from "./services/users-service";

import { TasksRepository } from "./repositories/tasks/task-repository-prisma";
import { TasksService } from "./services/tasks-service";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

const tasksRepository = new TasksRepository();
const tasksService = new TasksService(tasksRepository);

export { usersService, tasksService };
