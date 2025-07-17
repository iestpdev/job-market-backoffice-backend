import { Router } from "express";
import tutorController from "../controllers/tutor.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const TutorRouter = Router();

TutorRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => tutorController.getAll(req, res));

TutorRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'TUTOR'),
    (req, res) => tutorController.getById(req, res));

TutorRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => tutorController.create(req, res));

TutorRouter.patch("/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'TUTOR'),
    (req, res) => tutorController.update(req, res));

TutorRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => tutorController.deleteById(req, res));

export default TutorRouter;
