import ModelBase from "../../shared/model-base.js";

class Tutor extends ModelBase {
    constructor(
        id = null,
        apellidos,
        nombres,
        genero,
        fechNac,
        tipoDOI,
        numDOI,
    ) {
        super();
        this.id = id;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.genero = genero;
        this.fechNac = fechNac;
        this.tipoDOI = tipoDOI;
        this.numDOI = numDOI;
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM TUTORES WHERE deleted_at IS NULL"
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM TUTORES WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO TUTORES (APELLIDOS, NOMBRES, GENERO, FECH_NACIMIENTO, TIPO_DOI, NUM_DOI, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.apellidos,
                this.nombres,
                this.genero,
                this.fechNac,
                this.tipoDOI,
                this.numDOI,
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
            `UPDATE TUTORES
       SET APELLIDOS = ?, NOMBRES = ?, GENERO = ?, FECH_NACIMIENTO = ?, TIPO_DOI = ?, NUM_DOI = ?, updated_at = ?
       WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.apellidos,
                this.nombres,
                this.genero,
                this.fechNac,
                this.tipoDOI,
                this.numDOI,
                this.updated_at,
                this.id
            ]
        );
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE TUTORES SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }
}

export default Tutor;
