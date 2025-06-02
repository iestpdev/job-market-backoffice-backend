import ModelBase from "../../shared/model-base.js";

class Offer extends ModelBase {
    constructor(
        id = null,
        companyId,
        titulo,
        descripcion,
        sueldo = null,
        adHonorem = false,
        viaticos = null,
        bonos = null,
        requisitos = null,
        beneficios = null,
        numVacantes = null,
        fechaPublicacion = null,
        fechaCierre = null,
        contacto = null,
        correo = null,
        telefono = null
    ) {
        super();
        this.id = id;
        this.companyId = companyId;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.sueldo = sueldo;
        this.adHonorem = adHonorem;
        this.viaticos = viaticos;
        this.bonos = bonos;
        this.requisitos = requisitos;
        this.beneficios = beneficios;
        this.numVacantes = numVacantes;
        this.fechaPublicacion = fechaPublicacion;
        this.fechaCierre = fechaCierre;
        this.contacto = contacto;
        this.correo = correo;
        this.telefono = telefono
    }

    static async getAll(conexion) {
        const [result] = await conexion.query( 
            "SELECT * FROM OFERTAS WHERE deleted_at IS NULL ORDER BY created_at DESC"
        );
        return result;
    }

    static async getAllByCompanyId(conexion, companyId){
        const [result] = await conexion.query(
            "SELECT * FROM OFERTAS WHERE EMPRESA_ID = ? AND deleted_at IS NULL ORDER BY created_at DESC",
            [companyId]
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM OFERTAS WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO OFERTAS (
                EMPRESA_ID, TITULO, DESCRIPCION, SUELDO, AD_HONOREM, VIATICOS, BONOS,
                REQUISITOS, BENEFICIOS, NUM_VACANTES, FECHA_PUBLICACION, FECHA_CIERRE,
                CONTACTO, CORREO, TELEFONO, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.companyId,
                this.titulo,
                this.descripcion,
                this.sueldo,
                this.adHonorem,
                this.viaticos,
                this.bonos,
                this.requisitos,
                this.beneficios,
                this.numVacantes,
                this.fechaPublicacion,
                this.fechaCierre,
                this.contacto,
                this.correo,
                this.telefono,
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
            `UPDATE OFERTAS SET
            EMPRESA_ID = ?, TITULO = ?, DESCRIPCION = ?, SUELDO = ?, AD_HONOREM = ?, 
            VIATICOS = ?, BONOS = ?, REQUISITOS = ?, BENEFICIOS = ?, NUM_VACANTES = ?,
            FECHA_PUBLICACION = ?, FECHA_CIERRE = ?, CONTACTO = ?, CORREO = ?, TELEFONO = ?, updated_at = ?
            WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.companyId,
                this.titulo,
                this.descripcion,
                this.sueldo,
                this.adHonorem,
                this.viaticos,
                this.bonos,
                this.requisitos,
                this.beneficios,
                this.numVacantes,
                this.fechaPublicacion,
                this.fechaCierre,
                this.contacto,
                this.correo,
                this.telefono,
                this.updated_at,
                this.id
            ]
        );

        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE OFERTAS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }

}

export default Offer;