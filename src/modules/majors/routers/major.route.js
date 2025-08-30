import { Router } from "express";
import majorController from "../controllers/major.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";

const MajorRouter = Router();

MajorRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => majorController.getAll(req, res)
);

MajorRouter.get("/activated",
    (req, res) => majorController.GetActivated(req, res)
);

MajorRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => majorController.getById(req, res)
);

MajorRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => majorController.create(req, res)
);

MajorRouter.patch("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => majorController.update(req, res)
);

MajorRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => majorController.deleteById(req, res)
);

export default MajorRouter;
