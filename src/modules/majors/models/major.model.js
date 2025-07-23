import ModelBase from "../../shared/model-base.js";

class Major extends ModelBase {
    constructor(
        id = null,
        nombre,
        estado = true
    ) {
        super();
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            `SELECT * FROM PROGRAMA_ESTUDIO 
             WHERE deleted_at IS NULL 
             ORDER BY NOMBRE ASC`
        );
        return result;
    }

    static async getActived(conexion) {
        const [result] = await conexion.query(
            `SELECT ID, NOMBRE FROM PROGRAMA_ESTUDIO 
             WHERE ESTADO = 1 AND deleted_at IS NULL 
             ORDER BY NOMBRE ASC`
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            `SELECT * FROM PROGRAMA_ESTUDIO 
             WHERE ID = ? AND deleted_at IS NULL`,
            [id]
        );
        return result[0];
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO PROGRAMA_ESTUDIO (NOMBRE, ESTADO, created_at, updated_at)
             VALUES (?, ?, ?, ?)`,
            [this.nombre, this.estado, this.created_at, this.updated_at]
        );
        this.id = result.insertId;
        return result;
    }

    async update(conexion) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE PROGRAMA_ESTUDIO 
             SET NOMBRE = ?, ESTADO = ?, updated_at = ?
             WHERE ID = ? AND deleted_at IS NULL`,
            [this.nombre, this.estado, this.updated_at, this.id]
        );
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE PROGRAMA_ESTUDIO 
             SET deleted_at = ? 
             WHERE ID = ? AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }
}

export default Major;
