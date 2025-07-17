import { BaseController } from '../../shared/controller-base.js';
import {
    registerUserCompany,
    registerUserStudent,
    registerUserTutor
} from '../services/register.service.js';

class RegisterController extends BaseController {
    async registerUserCompany(req, res) {
        let conexion;
        try {
            conexion = await this.getDbPool().getConnection();
            const result = await registerUserCompany(conexion, req);
            res.status(201).json(result);
        } catch (err) {
            this.handleError(res, 400, err, 'Registro de empresa fallido.');
        }
    }

    async registerUserStudent(req, res) {
        let conexion;
        try {
            conexion = await this.getDbPool().getConnection();
            const result = await registerUserStudent(conexion, req.body);
            res.status(201).json(result);
        } catch (err) {
            this.handleError(res, 400, err, 'Registro de alumno fallido.');
        } finally {
            if (conexion) conexion.release();
        }
    }

    async registerUserTutor(req, res) {
        let conexion;
        try {
            conexion = await this.getDbPool().getConnection();
            const result = await registerUserTutor(conexion, req.body);
            res.status(201).json(result);
        } catch (err) {
            this.handleError(res, 400, err, 'Registro de docente fallido.');
        } finally {
            if (conexion) conexion.release();
        }
    }
}

export default new RegisterController();
