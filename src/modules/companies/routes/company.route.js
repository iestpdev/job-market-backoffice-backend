import { Router } from "express";
import companyController from "../controllers/company.controller.js";
import upload from "../../../middleware/multer/multer.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";


const companyRouter = Router();

companyRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'), 
    (req, res) => companyController.getAll(req, res));

companyRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY'),
    (req, res) => companyController.getById(req, res));

companyRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    upload.single("logo"), 
    (req, res) => companyController.create(req, res));

companyRouter.patch("/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY'),
    upload.single("logo"), 
    (req, res) => companyController.update(req, res));

companyRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => companyController.deleteById(req, res));

companyRouter.patch("/activate/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => companyController.activate(req, res));

companyRouter.patch("/deactivate/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => companyController.deactivate(req, res));

export default companyRouter;
