import { Router } from "express";
import offerController from "../controllers/offer.controller.js";

const offerRouter = Router();
offerRouter.get("/", (req, res) => offerController.getAll(req, res));
offerRouter.get("/:id", (req, res) => offerController.getById(req, res));
offerRouter.post("/", (req, res) => offerController.create(req, res));
offerRouter.patch("/:id", (req, res) => offerController.update(req, res));
offerRouter.delete("/:id", (req, res) => offerController.deleteById(req, res));

export default offerRouter;