class MajorsOffers {
    constructor(
        id = null,
        ofertaId,
        programaEstudioId
    ) {
        this.id = id;
        this.ofertaId = ofertaId;
        this.programaEstudioId = programaEstudioId;
    }

    async create(conexion) {
        const [result] = await conexion.query(
            `INSERT INTO OFERTA_PROGRAMA_ESTUDIO (
                OFERTA_ID,
                PROGRAMA_ESTUDIO_ID
            ) VALUES (?, ?)`,
            [this.ofertaId, this.programaEstudioId]
        );
        this.id = result.insertId;
        return result;
    }

    static async getAllByOfferId(conexion, offerId) {
        const [result] = await conexion.query(
            `
            SELECT OPE.*, PE.NOMBRE 
            FROM OFERTA_PROGRAMA_ESTUDIO AS OPE
            INNER JOIN PROGRAMA_ESTUDIO AS PE
            ON OPE.PROGRAMA_ESTUDIO_ID = PE.ID
            WHERE OPE.OFERTA_ID = ?
            `,
            [offerId]
        );
        return result;
    }

    static async getAllOffersByMajorId(conexion, majorId) {
        const [result] = await conexion.query(
            `SELECT * FROM VIEW_OFERTAS_CON_INFO_PE_EMPRESAS
                WHERE
                PROGRAMA_ESTUDIO_ID = ?`,
            [majorId]
        );
        return result;
    }

    static async hardDeleteByOfferId(conexion, offerId) {
        const [result] = await conexion.query(
            `DELETE FROM OFERTA_PROGRAMA_ESTUDIO WHERE OFERTA_ID = ?`,
            [offerId]
        );
        return result;
    }
}

export default MajorsOffers;