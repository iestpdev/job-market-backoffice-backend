import { BaseController } from "../../shared/controller-base.js";
import User from "../models/user.model.js";
import { userSchema } from "../validators/user.validator.js";
import bcrypt from "bcrypt";

class UserController extends BaseController {
    async getAll(req, res) {
        try {
            const users = await User.getAll(this.getDbPool());
            res.json(users);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los usuarios");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await User.getById(this.getDbPool(), id);

            if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
            res.json(user);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener el usuario");
        }
    }

    async create(req, res) {
        try {
            const { error: validationError, value } = userSchema.validate(req.body);
            if (validationError) return res.status(400).json({ message: "Validación fallida", details: validationError.details });

            const usernameExists = await User.isUsernameTaken(this.getDbPool(), value.username);
            if (usernameExists) return res.status(400).json({ message: "El nombre de usuario ya está en uso" });

            const hashedPassword = await bcrypt.hash(value.userpass, 10);
            const user = new User(
                null,
                (value.companyId) ? 'COMPANY' : (value.studentId) ? 'STUDENT' : 'ADMIN',
                value.username,
                hashedPassword,
                value.companyId,
                value.studentId,
            );

            const result = await user.create(this.getDbPool());
            const newId = result.insertId;

            res.status(201).json({ message: "Usuario creado", id: newId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear el usuario");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existingUser = await User.getById(this.getDbPool(), id);
            if (!existingUser) return res.status(404).json({ message: "Usuario no encontrado" });

            const { error } = userSchema.validate(req.body, { abortEarly: false });
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details.map(d => d.message) });

            const current = existingUser;
            const {
                username = current.USERNAME,
                userpass = current.USERPASS,
                companyId = current.EMPRESA_ID,
                studentId = current.ALUMNO_ID,
            } = req.body;

            const usernameExists = await User.isUsernameTaken(this.getDbPool(), username, id);
            if (usernameExists) return res.status(400).json({ message: "El nombre de usuario ya está en uso por otro usuario" });

            let newUserPass;
            if (userpass) newUserPass = await bcrypt.hash(userpass, 10);

            const user = new User(
                id,
                (companyId) ? 'COMPANY' : (studentId) ? 'STUDENT' : 'ADMIN',
                username,
                newUserPass,
                companyId,
                studentId,
            );

            const result = await user.update(this.getDbPool());

            if (result.affectedRows <= 0) return res.sendStatus(204);
            res.json({ message: "Usuario actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el usuario");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await User.getById(this.getDbPool(), id);
            if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

            const result = await User.softDelete(this.getDbPool(), id);
            if (result.affectedRows <= 0)
                return res.status(404).json({ message: "Error al eliminar el usuario" });

            res.json({ message: "Usuario eliminado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar el usuario");
        }
    }
}

export default new UserController();
