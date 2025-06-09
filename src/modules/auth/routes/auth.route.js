import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = Router();
authRouter.post('/', (req, res) => authController.login(req, res));

export default authRouter;
