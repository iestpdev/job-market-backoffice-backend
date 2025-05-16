import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", (req, res) => userController.getAll(req, res));
userRouter.get("/:id", (req, res) => userController.getById(req, res));
userRouter.post("/", (req, res) => userController.create(req, res));
userRouter.patch("/:id", (req, res) => userController.update(req, res));
userRouter.delete("/:id", (req, res) => userController.deleteById(req, res));

export default userRouter;
