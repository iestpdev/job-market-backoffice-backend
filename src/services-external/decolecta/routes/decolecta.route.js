import { Router } from "express";
import decolectaController from "../controllers/decolecta.controller.js";

const decolectaRouter = Router();

decolectaRouter.get("/sunat/:ruc", (req, res) => decolectaController.getSunat(req, res));
decolectaRouter.get("/reniec/:dni", (req, res) => decolectaController.getReniec(req, res));

export default decolectaRouter;
