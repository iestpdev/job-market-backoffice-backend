import { Router } from "express";
import majorsOffersController from "../controllers/majors-offers.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const MajorsOffersRouter = Router();

MajorsOffersRouter.get(
    "/:offerId",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY', 'STUDENT'),
    (req, res) => majorsOffersController.getAllByOfferId(req, res)
);

MajorsOffersRouter.post(
    "/:offerId",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY'),
    (req, res) => majorsOffersController.assignProgramsToOffer(req, res)
);

MajorsOffersRouter.get(
    "/get-offers-by-major-id/:majorId",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY', 'STUDENT'),
    (req, res) => majorsOffersController.getAllOffersByMajorId(req, res)
);

export default MajorsOffersRouter;
