import { Router } from "express";
import offerController from "../controllers/offer.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const offerRouter = Router();

offerRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'), 
    (req, res) => offerController.getAll(req, res));

offerRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => offerController.getById(req, res));

offerRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => offerController.create(req, res));

offerRouter.patch("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => offerController.update(req, res));

offerRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => offerController.deleteById(req, res));

export default offerRouter;