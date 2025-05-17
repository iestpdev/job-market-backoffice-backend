import { Router } from "express";
import companyController from "../controllers/company.controller.js";
import upload from "../../../middleware/multer/multer.js";

const companyRouter = Router();
companyRouter.get("/", (req, res) => companyController.getAll(req, res));
companyRouter.get("/:id", (req, res) => companyController.getById(req, res));
companyRouter.post("/", upload.single("logo"), (req, res) => companyController.create(req, res));
companyRouter.patch("/:id", upload.single("logo"), (req, res) => companyController.update(req, res));
companyRouter.delete("/:id", (req, res) => companyController.deleteById(req, res));
companyRouter.patch("/activate/:id", (req, res) => companyController.activate(req, res));
companyRouter.patch("/deactivate/:id", (req, res) => companyController.deactivate(req, res));

export default companyRouter;
