class SavedOffer {
    constructor(
        ofertaId,
        alumnoId,
        created_at = null,
    ) {
        this.ofertaId = ofertaId;
        this.alumnoId = alumnoId;
        this.created_at = created_at;
    }

    static async getAllByStudentId(conexion, alumnoId) {
        const [result] = await conexion.query(
            `SELECT * FROM VIEW_OFERTAS_GUARDADAS WHERE ALUMNO_ID = ? AND oferta_deleted_at IS NULL`,
            [alumnoId]
        );
        return result;
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        const [result] = await conexion.query(
            `INSERT INTO OFERTAS_GUARDADAS (
                OFERTA_ID,
                ALUMNO_ID,
                created_at
            ) VALUES (?, ?, ?)`,
            [this.ofertaId, this.alumnoId, this.created_at]
        );
        return result;
    }

    static async exists(conexion, ofertaId, alumnoId) {
        const [result] = await conexion.query(
            `SELECT * FROM OFERTAS_GUARDADAS WHERE OFERTA_ID = ? AND ALUMNO_ID = ?`,
            [ofertaId, alumnoId]
        );
        return result.length > 0;
    }

    static async hardDelete(conexion, ofertaId, alumnoId) {
        const [result] = await conexion.query(
            `DELETE FROM OFERTAS_GUARDADAS WHERE OFERTA_ID = ? AND ALUMNO_ID = ?`,
            [ofertaId, alumnoId]
        );
        return result;
    }

}

export default SavedOffer;