import ModelBase from "../../shared/model-base.js";

class User extends ModelBase {
    constructor(
        id = null,
        tipo,
        username,
        userpass,
        companyId = null,
        studentId = null,
        tutorId = null,
    ) {
        super();
        this.id = id;
        this.tipo = tipo;
        this.username = username;
        this.userpass = userpass;
        this.companyId = companyId;
        this.studentId = studentId;
        this.tutorId = tutorId;
        this.isActive = true;
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM USUARIOS WHERE deleted_at IS NULL"
        );
        return result;
    }

    static async getAllOnlyUsersAdmin(conexion){
        const [result] = await conexion.query(
            "SELECT * FROM USUARIOS WHERE TIPO='ADMIN' AND deleted_at IS NULL"
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM USUARIOS WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    static async getByTutorId(conexion, tutorId) {
        const [result] = await conexion.query(
            "SELECT * FROM USUARIOS WHERE TUTOR_ID = ? AND deleted_at IS NULL",
            [tutorId]
        );
        return result[0];
    }

    static async getByStudentId(conexion, studentId) {
        const [result] = await conexion.query(
            "SELECT * FROM USUARIOS WHERE ALUMNO_ID = ? AND deleted_at IS NULL",
            [studentId]
        );
        return result[0];
    }

    static async getByCompanyId(conexion, companyId) {
        const [result] = await conexion.query(
            "SELECT * FROM USUARIOS WHERE EMPRESA_ID = ? AND deleted_at IS NULL",
            [companyId]
        );
        return result[0];
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO USUARIOS (TIPO, USERNAME, USERPASS, EMPRESA_ID, ALUMNO_ID, TUTOR_ID, is_active, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.tipo,
                this.username,
                this.userpass,
                this.companyId,
                this.studentId,
                this.tutorId,
                this.isActive,
                this.created_at,
                this.updated_at
            ]
        );
        this.id = result.insertId;
        return result;
    }

    async update(conexion) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE USUARIOS
             SET TIPO = ?, USERNAME = ?, USERPASS = ?, EMPRESA_ID = ?, ALUMNO_ID = ?, TUTOR_ID = ?, is_active = ?, updated_at = ?
             WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.tipo,
                this.username,
                this.userpass,
                this.companyId,
                this.studentId,
                this.tutorId,
                this.isActive,
                this.updated_at,
                this.id
            ]
        );
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE USUARIOS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }

    static async isUsernameTaken(conexion, username, excludeUserId = null) {
        let query = `SELECT COUNT(*) as count FROM USUARIOS WHERE USERNAME = ? AND deleted_at IS NULL`;
        const params = [username];

        if (excludeUserId) {
            query += ` AND ID != ?`;
            params.push(excludeUserId);
        }

        const [result] = await conexion.query(query, params);
        return result[0].count > 0;
    }

    async updateCredencialsByTutorId(conexion, tutorId) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE USUARIOS
         SET USERNAME = ?, USERPASS = ?, updated_at = ?
         WHERE TUTOR_ID = ? AND deleted_at IS NULL`,
            [
                this.username,
                this.userpass,
                this.updated_at,
                tutorId
            ]
        );
        return result;
    }

    async updateCredencialsByStudentId(conexion, studentId) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE USUARIOS
         SET USERNAME = ?, USERPASS = ?, updated_at = ?
         WHERE ALUMNO_ID = ? AND deleted_at IS NULL`,
            [
                this.username,
                this.userpass,
                this.updated_at,
                studentId
            ]
        );
        return result;
    }

    async updateCredencialsByCompanyId(conexion, companyId) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE USUARIOS
         SET USERNAME = ?, USERPASS = ?, updated_at = ?
         WHERE EMPRESA_ID = ? AND deleted_at IS NULL`,
            [
                this.username,
                this.userpass,
                this.updated_at,
                companyId
            ]
        );
        return result;
    }

}

export default User;