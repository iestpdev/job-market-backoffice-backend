import { Router } from "express";
import studentController from "../controllers/student.controller.js";

const studentRouter = Router();
studentRouter.get("/", (req, res) => studentController.getAll(req, res));
studentRouter.get("/:id", (req, res) => studentController.getById(req, res));
studentRouter.post("/", (req, res) => studentController.create(req, res));
studentRouter.patch("/:id", (req, res) => studentController.update(req, res));
studentRouter.delete("/:id", (req, res) => studentController.deleteById(req, res));

export default studentRouter;
