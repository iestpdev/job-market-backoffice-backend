import ModelBase from "../../shared/model-base.js";

class MajorsOffers extends ModelBase {
    constructor(
        id = null,
        ofertaId,
        programaEstudioId
    ) {
        super();
        this.id = id;
        this.ofertaId = ofertaId;
        this.programaEstudioId = programaEstudioId;
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO OFERTA_PROGRAMA_ESTUDIO (
                OFERTA_ID,
                PROGRAMA_ESTUDIO_ID,
                created_at,
                updated_at
            ) VALUES (?, ?, ?, ?)`,
            [this.ofertaId, this.programaEstudioId, this.created_at, this.updated_at]
        );
        this.id = result.insertId;
        return result;
    }

    static async getAllByOfferId(conexion, offerId) {
        const [result] = await conexion.query(
            `SELECT * FROM OFERTA_PROGRAMA_ESTUDIO 
             WHERE OFERTA_ID = ? AND deleted_at IS NULL`,
            [offerId]
        );
        return result;
    }

    static async getAllOffersByMajorId(conexion, majorId) {
        const [result] = await conexion.query(
            `SELECT * FROM VIEW_OFERTAS_CON_INFO_PE_EMPRESAS
                WHERE
                PROGRAMA_ESTUDIO_ID = ?
                AND deleted_at IS NULL
                AND oferta_deleted_at IS NULL
                ORDER BY oferta_created_at DESC`,
            [majorId]
        );
        return result;
    }

    static async softDeleteByOfferId(conexion, offerId) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE OFERTA_PROGRAMA_ESTUDIO 
             SET deleted_at = ?, updated_at = ? 
             WHERE OFERTA_ID = ? AND deleted_at IS NULL`,
            [deleted_at, deleted_at, offerId]
        );
        return result;
    }
}

export default MajorsOffers;
