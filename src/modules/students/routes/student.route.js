import { Router } from "express";
import studentController from "../controllers/student.controller.js";

const studentRouter = Router();
studentRouter.get("/", (req, res) => studentController.getAll(req, res));

export default studentRouter;
