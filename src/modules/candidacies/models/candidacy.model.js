import ModelBase from "../../shared/model-base.js";

class Candidacy extends ModelBase {
    constructor(
        id = null,
        ofertaId,
        alumnoId,
        fechaPostulacion = new Date(),
        estadoRespuesta = 'PENDING',
        docAdjunto1,
        docAdjunto2 = null,
        docAdjunto3 = null,
        docAdjunto4 = null,
    ) {
        super();
        this.id = id;
        this.ofertaId = ofertaId;
        this.alumnoId = alumnoId;
        this.fechaPostulacion = fechaPostulacion;
        this.estadoRespuesta = estadoRespuesta;
        this.docAdjunto1 = docAdjunto1;
        this.docAdjunto2 = docAdjunto2;
        this.docAdjunto3 = docAdjunto3;
        this.docAdjunto4 = docAdjunto4;
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM POSTULACIONES WHERE deleted_at IS NULL"
        );
        return result;
    }

    static async getAllByCompanyId(conexion, companyId){
        const [result] = await conexion.query(
            "SELECT * FROM VIEW_POSTULACIONES_CON_INFO_EMPRESA_ALUMNO WHERE EMPRESA_ID = ? AND deleted_at IS NULL ORDER BY created_at DESC",
            [companyId]
        )
        return result;
    }

    static async getAttachmentsByStudentId(conexion, alumnoId) {
        const [result] = await conexion.query(
            "SELECT ALUMNO_ID, DOC_ADJUNTO2, DOC_ADJUNTO3, DOC_ADJUNTO4 FROM POSTULACIONES WHERE ALUMNO_ID = ? AND deleted_at IS NULL",
            [alumnoId]
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM POSTULACIONES WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    static async getByOfferId(conexion, ofertaId) {
        const [result] = await conexion.query(
            "SELECT * FROM POSTULACIONES WHERE OFERTA_ID = ? AND deleted_at IS NULL",
            [ofertaId]
        );
        return result;
    }

    static async getByStudentId(conexion, alumnoId) {
        const [result] = await conexion.query(
            "SELECT * FROM POSTULACIONES WHERE ALUMNO_ID = ? AND deleted_at IS NULL",
            [alumnoId]
        );
        return result;
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO POSTULACIONES (
                OFERTA_ID, 
                ALUMNO_ID, 
                FECHA_POSTULACION, 
                ESTADO_RESPUESTA, 
                DOC_ADJUNTO1, 
                DOC_ADJUNTO2, 
                DOC_ADJUNTO3, 
                DOC_ADJUNTO4, 
                created_at, 
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.ofertaId,
                this.alumnoId,
                this.fechaPostulacion,
                this.estadoRespuesta,
                this.docAdjunto1,
                this.docAdjunto2,
                this.docAdjunto3,
                this.docAdjunto4,
                this.created_at,
                this.updated_at
            ]
        );
        this.id = result.insertId;
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            "UPDATE POSTULACIONES SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL",
            [deleted_at, id]
        );
        return result;
    }

    static async updateStatus(conexion, id, status) {
        const updated_at = new Date();
        const [result] = await conexion.query(
            "UPDATE POSTULACIONES SET ESTADO_RESPUESTA = ?, updated_at = ? WHERE ID = ? AND deleted_at IS NULL",
            [status, updated_at, id]
        );
        return result;
    }

    static async exists(conexion, ofertaId, alumnoId) {
        const [result] = await conexion.query(
            "SELECT 1 FROM POSTULACIONES WHERE OFERTA_ID = ? AND ALUMNO_ID = ? AND deleted_at IS NULL LIMIT 1",
            [ofertaId, alumnoId]
        );
        return result.length > 0;
    }

    static async updateDoc(conexion, id, docAdjunto, fieldName) {
        const [result] = await conexion.execute(
            `UPDATE POSTULACIONES SET ${fieldName} = ? WHERE ID = ? AND ESTADO_RESPUESTA='PENDING'  AND deleted_at IS NULL`,
            [docAdjunto, id]
        );
        return result;
    }
}

export default Candidacy;