import ModelBase from "../../shared/model-base";

class Company extends ModelBase {
    constructor(
        id = null,
        razonSocial,
        ruc,
        logo,
        direccion1,
        direccion2 = null,
        rubro,
        contacto1,
        telefono1,
        correo1,
        contacto2 = null,
        telefono2 = null,
        correo2 = null,
        contacto3 = null,
        telefono3 = null,
        correo3 = null,
        isActive = true
    ) {
        super();
        this.id = id;
        this.razonSocial = razonSocial;
        this.ruc = ruc;
        this.logo = logo;
        this.direccion1 = direccion1;
        this.direccion2 = direccion2;
        this.rubro = rubro;
        this.contacto1 = contacto1;
        this.telefono1 = telefono1;
        this.correo1 = correo1;
        this.contacto2 = contacto2;
        this.telefono2 = telefono2;
        this.correo2 = correo2;
        this.contacto3 = contacto3;
        this.telefono3 = telefono3;
        this.correo3 = correo3;
        this.isActive = isActive;
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM EMPRESA WHERE deleted_at IS NULL"
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM EMPRESA WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO EMPRESA 
      (
        RAZON_SOCIAL, RUC, LOGO, DIRECCION1, DIRECCION2, RUBRO,
        CONTACTO1, TELEFONO1, CORREO1,
        CONTACTO2, TELEFONO2, CORREO2,
        CONTACTO3, TELEFONO3, CORREO3,
        is_active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.razonSocial,
                this.ruc,
                this.logo,
                this.direccion1, this.direccion2,
                this.rubro,
                this.contacto1, this.telefono1, this.correo1,
                this.contacto2, this.telefono2, this.correo2,
                this.contacto3, this.telefono3, this.correo3,
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
            `UPDATE EMPRESA SET 
        RAZON_SOCIAL = ?, RUC = ?, LOGO = ?, DIRECCION1 = ?, DIRECCION2 = ?, RUBRO = ?,
        CONTACTO1 = ?, TELEFONO1 = ?, CORREO1 = ?,
        CONTACTO2 = ?, TELEFONO2 = ?, CORREO2 = ?,
        CONTACTO3 = ?, TELEFONO3 = ?, CORREO3 = ?,
        is_active = ?, updated_at = ?
      WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.razonSocial,
                this.ruc,
                this.logo,
                this.direccion1, this.direccion2,
                this.rubro,
                this.contacto1, this.telefono1, this.correo1,
                this.contacto2, this.telefono2, this.correo2,
                this.contacto3, this.telefono3, this.correo3,
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
            `UPDATE EMPRESA SET deleted_at = ? WHERE ID = ? AND is_active = 0 AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }

    static async updateLogo(conexion, id, logoUrl) {
        const [result] = await conexion.query(
            `UPDATE EMPRESA SET LOGO = ?, updated_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [logoUrl, new Date(), id]
        );
        return result;
    }

    static async activate(conexion, id) {
        const updated_at = new Date();
        const [result] = await conexion.query(
            `UPDATE EMPRESA SET is_active = 1, updated_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [updated_at, id]
        );
        return result;
    }

    static async deactivate(conexion, id) {
        const updated_at = new Date();
        const [result] = await conexion.query(
            `UPDATE EMPRESA SET is_active = 0, updated_at = ? WHERE ID = ? AND deleted_at IS NULL`,
            [updated_at, id]
        );
        return result;
    }
}

export default Company;