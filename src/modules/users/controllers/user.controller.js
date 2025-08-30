import { BaseController } from "../../shared/controller-base.js";
import User from "../models/user.model.js";
import { userSchema } from "../validators/user.validator.js";
import bcrypt from "bcrypt";

class UserController extends BaseController {
    async getAll(_, res) {
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

    async getByTutorId(req, res) {
        try {
            const tutorId = parseInt(req.params.tutorId);
            const user = await User.getByTutorId(this.getDbPool(), tutorId);

            if (!user) return res.status(404).json({ message: "Usuario no encontrado por TUTOR_ID" });
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
                (value.companyId) ? 'COMPANY' : (value.studentId) ? 'STUDENT' : (value.tutorId) ? 'TUTOR' : 'ADMIN',
                value.username,
                hashedPassword,
                value.companyId,
                value.studentId,
                value.tutorId
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
                companyId = current.EMPRESA_ID,
                studentId = current.ALUMNO_ID,
                tutorId = current.TUTOR_ID,
                currentPassword,
                newPassword
            } = req.body;

            const usernameExists = await User.isUsernameTaken(this.getDbPool(), username, id);
            if (usernameExists) return res.status(400).json({ message: "El nombre de usuario ya está en uso por otro usuario" });

            let finalPassword = current.USERPASS;
            if (currentPassword || newPassword) {
                if (!currentPassword || !newPassword) return res.status(400).json({ message: "Debe proporcionar currentPassword y newPassword para cambiar la contraseña" });

                const passwordMatch = await bcrypt.compare(currentPassword, current.USERPASS);
                if (!passwordMatch) return res.status(400).json({ message: "La contraseña actual es incorrecta" });
                finalPassword = await bcrypt.hash(newPassword, 10);
            }

            const user = new User(
                id,
                (companyId) ? 'COMPANY' : (studentId) ? 'STUDENT' : (tutorId) ? 'TUTOR' : 'ADMIN',
                username,
                finalPassword,
                companyId,
                studentId,
                tutorId,
            );

            const result = await user.update(this.getDbPool());

            if (result.affectedRows <= 0) return res.sendStatus(204);
            res.json({ message: "Usuario actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el usuario");
        }
    }

    async updateByTutorId(req, res) {
        try {
            const tutorId = parseInt(req.params.tutorId);
            const existingUser = await User.getByTutorId(this.getDbPool(), tutorId);
            if (!existingUser) return res.status(404).json({ message: "Usuario no encontrado con el TUTOR_ID especificado" });

            const { error } = userSchema.validate(req.body, { abortEarly: false });
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details.map(d => d.message) });

            const current = existingUser;
            console.log(current)
            const {
                username = current.USERNAME,
                currentPassword,
                newPassword
            } = req.body;

            const usernameExists = await User.isUsernameTaken(this.getDbPool(), username, current.ID);
            if (usernameExists) return res.status(400).json({ message: "El nombre de usuario ya está en uso por otro usuario" });

            let finalPassword = current.USERPASS;
            if (currentPassword || newPassword) {
                if (!currentPassword || !newPassword) return res.status(400).json({ message: "Debe proporcionar currentPassword y newPassword para cambiar la contraseña" });

                const passwordMatch = await bcrypt.compare(currentPassword, current.USERPASS);
                if (!passwordMatch) return res.status(400).json({ message: "La contraseña actual es incorrecta" });
                finalPassword = await bcrypt.hash(newPassword, 10);
            }

            const user = new User(
                current.ID,
                current.TIPO,
                username,
                finalPassword,
                current.EMPRESA_ID,
                current.ALUMNO_ID,
                tutorId,
                current.isActive
            );

            const result = await user.updateCredencialsByTutorId(this.getDbPool(), tutorId);
            if (result.affectedRows <= 0) return res.sendStatus(204); // No se realizaron cambios

            res.json({ message: "Usuario actualizado por TUTOR_ID" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el usuario por TUTOR_ID");
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
