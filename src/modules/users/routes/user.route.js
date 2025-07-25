import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const userRouter = Router();

userRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => userController.getAll(req, res));

userRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => userController.getById(req, res));

userRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => userController.create(req, res));

userRouter.patch("/:id",
    verifyToken,
    authorizeRoles('ADMIN','COMPANY', 'STUDENT', 'TUTOR'),
    (req, res) => userController.update(req, res));

userRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => userController.deleteById(req, res));

// TODO: rutas para actualizar el estado del usuario (is_active)

export default userRouter;
