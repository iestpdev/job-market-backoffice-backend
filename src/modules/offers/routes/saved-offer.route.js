import { Router } from "express";
import savedOfferController from "../controllers/saved-offer.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const savedOfferRouter = Router();
savedOfferRouter.get("/:studentId",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    (req, res) => savedOfferController.getAllByStudentId(req, res));

savedOfferRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    (req, res) => savedOfferController.create(req, res));

savedOfferRouter.delete("/",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT', 'TUTOR'),
    (req, res) => savedOfferController.delete(req, res));

export default savedOfferRouter;