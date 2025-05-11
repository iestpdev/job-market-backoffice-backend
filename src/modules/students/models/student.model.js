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
    curriculum
  ) {
    this.id = id;
    this.apellidos = apellidos;
    this.nombres = nombres;
    this.genero = genero;
    this.fechNac = fechNac;
    this.tipoDOI = tipoDOI;
    this.numDOI = numDOI;
    this.curriculum = curriculum;
  }

  static async getAll(conexion) {
    const [result] = await conexion.query(
      "SELECT * FROM ALUMNOS WHERE deleted_at IS NULL"
    );
    return result;
  }
}

export default Student;
