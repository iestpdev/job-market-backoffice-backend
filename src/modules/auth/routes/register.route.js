import { Router } from 'express';
import upload from '../../../middleware/multer/multer.js';
import registerController from '../controllers/register.controller.js';

const registerRouter = Router();

registerRouter.post(
    '/company',
    upload.single('logo'),
    (req, res) => registerController.registerUserCompany(req, res)
);

registerRouter.post(
    '/student',
    (req, res) => registerController.registerUserStudent(req, res)
);

export default registerRouter;
