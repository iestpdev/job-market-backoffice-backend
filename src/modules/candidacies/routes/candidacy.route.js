import { Router } from "express";
import upload from "../../../middleware/multer/multer.js";
import candidacyController from "../controllers/candidacy.controller.js";
import { verifyToken } from "../../../middleware/jwt/auth.js";
import { authorizeRoles } from "../../../middleware/jwt/roles.js";


const candidacyRouter = Router();

candidacyRouter.get("/",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => candidacyController.getAll(req, res));

candidacyRouter.get("/get-amount-candidates-by-offer-id/:id",
    //verifyToken,
    //authorizeRoles('ADMIN', 'COMPANY'),
    (req, res) => candidacyController.getAmountCandidatesByOfferId(req, res));

candidacyRouter.get("/get-all-by-company-id/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY'),
    (req, res) => candidacyController.getAllByCompanyId(req, res));

candidacyRouter.get("/get-all-by-student-id/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    (req, res) => candidacyController.getAllByStudentId(req, res));

candidacyRouter.get("/get-attachments-by-student-id/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY'),
    (req, res) => candidacyController.getAttachmentsByStudentId(req, res));

candidacyRouter.get("/exists/:ofertaId/:alumnoId",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    (req, res) => candidacyController.exists(req, res)
);

candidacyRouter.get("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => candidacyController.getById(req, res));

candidacyRouter.post("/",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    (req, res) => candidacyController.create(req, res));

// TODO: Enviar el nombre del archivo como una query, no como param (:field)
candidacyRouter.patch("/upload-doc/:id/:field",
    verifyToken,
    authorizeRoles('ADMIN', 'STUDENT'),
    upload.single("file"),
    (req, res) => candidacyController.uploadDocument(req, res));

candidacyRouter.delete("/:id",
    verifyToken,
    authorizeRoles('ADMIN'),
    (req, res) => candidacyController.deleteById(req, res));

candidacyRouter.patch("/status/:id",
    verifyToken,
    authorizeRoles('ADMIN', 'COMPANY'),
    (req, res) => candidacyController.updateStatus(req, res));

export default candidacyRouter;