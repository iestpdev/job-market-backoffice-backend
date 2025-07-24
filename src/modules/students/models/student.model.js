import ModelBase from "../../shared/model-base.js";

class Student extends ModelBase {
  constructor(
    id = null,
    apellidos,
    nombres,
    genero,
    fechNac,
    tipoDOI,
    numDOI,
    programaEstudioId,
    esEgresado,
    curriculum
  ) {
    super();
    this.id = id;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.genero = genero;
    this.fechNac = fechNac;
    this.tipoDOI = tipoDOI;
    this.numDOI = numDOI;
    this.programaEstudioId = programaEstudioId;
    this.esEgresado = esEgresado;
    this.curriculum = curriculum;
  }

  static async getAll(conexion) {
    const [result] = await conexion.query(
      "SELECT * FROM ALUMNOS WHERE deleted_at IS NULL"
    );
    return result;
  }

  static async getById(conexion, id) {
    const [result] = await conexion.query(
      "SELECT * FROM ALUMNOS WHERE ID = ? AND deleted_at IS NULL",
      [id]
    );
    return result[0];
  }

  async create(conexion) {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;

    const [result] = await conexion.query(
      `INSERT INTO ALUMNOS (
         APELLIDOS, NOMBRES, GENERO, FECH_NACIMIENTO,
         TIPO_DOI, NUM_DOI, PROGRAMA_ESTUDIO_ID, ES_EGRESADO,
         CURRICULUM, created_at, updated_at
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        this.apellidos,
        this.nombres,
        this.genero,
        this.fechNac,
        this.tipoDOI,
        this.numDOI,
        this.programaEstudioId,
        this.esEgresado,
        this.curriculum,
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
      `UPDATE ALUMNOS
       SET APELLIDOS = ?, NOMBRES = ?, GENERO = ?, FECH_NACIMIENTO = ?,
           TIPO_DOI = ?, NUM_DOI = ?, PROGRAMA_ESTUDIO_ID = ?, ES_EGRESADO = ?,
           CURRICULUM = ?, updated_at = ?
       WHERE ID = ? AND deleted_at IS NULL`,
      [
        this.apellidos,
        this.nombres,
        this.genero,
        this.fechNac,
        this.tipoDOI,
        this.numDOI,
        this.programaEstudioId,
        this.esEgresado,
        this.curriculum,
        this.updated_at,
        this.id
      ]
    );
    return result;
  }

  static async softDelete(conexion, id) {
    const deleted_at = new Date();
    const [result] = await conexion.query(
      `UPDATE ALUMNOS SET deleted_at = ? WHERE ID = ? AND deleted_at IS NULL`,
      [deleted_at, id]
    );
    return result;
  }

  static async updateCurriculum(conexion, id, curriculumUrl) {
    const [result] = await conexion.execute(
      `UPDATE ALUMNOS SET CURRICULUM = ? WHERE ID = ?`,
      [curriculumUrl, id]
    );
    return result;
  }
}

export default Student;
