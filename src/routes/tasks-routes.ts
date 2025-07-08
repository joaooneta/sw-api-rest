import { Router } from "express";
import { TasksController } from "../controllers/tasks-controller";

const router = Router();
const controller = new TasksController();

router.get("/", async (req, res) => {
  await controller.getAll(req, res);
});

router.post("/", async (req, res) => {
  await controller.create(req, res);
});

router.get("/:id", async (req, res) => {
  await controller.getById(req, res);
});

router.put("/:id", async (req, res) => {
  await controller.update(req, res);
});

router.delete("/:id", async (req, res) => {
  await controller.delete(req, res);
});

export default router;
