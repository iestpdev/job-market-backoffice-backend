import { Router } from "express";
import studentController from "../controllers/student.controller.js";
import upload from "../../../middleware/multer/multer.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const studentRouter = Router();

studentRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'), 
    (req, res) => studentController.getAll(req, res));

studentRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY', 'STUDENT'), 
    (req, res) => studentController.getById(req, res));

studentRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    upload.single("curriculum"),
    (req, res) => studentController.create(req, res));

studentRouter.patch("/:id", 
    verifyToken,
    authorizeRoles('ADMIN'),
    upload.single('curriculum'),
    (req, res) => studentController.update(req, res));

studentRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => studentController.deleteById(req, res));

export default studentRouter;
