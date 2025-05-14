import { Router } from "express";
import upload from "../../../middleware/upload.js";
import candidacyController from "../controllers/candidacy.controller.js";

const candidacyRouter = Router();
candidacyRouter.get("/", (req, res) => candidacyController.getAll(req, res));
candidacyRouter.get("/:id", (req, res) => candidacyController.getById(req, res));
candidacyRouter.post("/",(req, res) => candidacyController.create(req, res));
candidacyRouter.patch("/upload-doc/:id/:field", upload.single("file"),(req, res) => candidacyController.uploadDocument(req, res));
candidacyRouter.delete("/:id", (req, res) => candidacyController.deleteById(req, res));
candidacyRouter.patch("/status/:id", (req, res) => candidacyController.updateStatus(req, res));

export default candidacyRouter;