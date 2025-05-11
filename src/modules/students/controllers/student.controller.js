import { BaseController } from "../../shared/controller-base.js";
import Student from "../models/student.model.js";
import { studentSchema } from "./student.validator.js";

class StudentController extends BaseController {
  async getAll(req, res) {
    try {
      const students = await Student.getAll(this.getDbPool());
      res.json(students);
    } catch (error) {
      this.handleError(res, 500, error, "Error al obtener los estudiantes");
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const student = await Student.getById(this.getDbPool(), id);

      if (!student) return res.status(404).json({ message: "Estudiante no encontrado" });
      res.json(student);
    } catch (error) {
      this.handleError(res, 500, error, "Error al obtener el estudiante");
    }
  }

  async create(req, res) {
    try {
      const { error, value } = studentSchema.validate(req.body);
      if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });
      
      const { apellidos, nombres, genero, fechNac, tipoDOI, numDOI, curriculum } = value;
      const student = new Student(null, apellidos, nombres, genero, fechNac, tipoDOI, numDOI, curriculum);
      const result = await student.create(this.getDbPool());

      res.status(201).json({ message: "Estudiante creado", id: result.insertId });
    } catch (error) {
      this.handleError(res, 500, error, "Error al crear el estudiante");
    }
  }

   async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const existingStudent = await Student.getById(this.getDbPool(), id);
      if (!existingStudent) return res.status(404).json({ message: "Estudiante no encontrado" });

      const mergedData = {
        apellidos: req.body.apellidos ?? existingStudent.APELLIDOS,
        nombres: req.body.nombres ?? existingStudent.NOMBRES,
        genero: req.body.genero ?? existingStudent.GENERO,
        fechNac: req.body.fechNac ?? existingStudent.FECH_NACIMIENTO,
        tipoDOI: req.body.tipoDOI ?? existingStudent.TIPO_DOI,
        numDOI: req.body.numDOI ?? existingStudent.NUM_DOI,
        curriculum: req.body.curriculum ?? existingStudent.CURRICULUM,
      };

      const { error, value } = studentSchema.validate(mergedData);
      if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });
      
      const { apellidos, nombres, genero, fechNac, tipoDOI, numDOI, curriculum } = value;
      const student = new Student(id, apellidos, nombres, genero, fechNac, tipoDOI, numDOI, curriculum);
      const result = await student.update(this.getDbPool());

      if (result.affectedRows <= 0) return res.sendStatus(204);
      res.json({ message: "Estudiante actualizado" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al actualizar el estudiante");
    }
  }
  
  async deleteById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const student = await Student.getById(this.getDbPool(), id);
      
      if (!student)  return res.status(404).json({ message: "Estudiante no encontrado" });
      const result =  await Student.softDelete(this.getDbPool(), id);
      if (result.affectedRows <= 0) return res.status(404).json({ message: "error al eliminar Estudiante" });

      res.json({ message: "Estudiante eliminado (soft delete)" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al eliminar el estudiante");
    }
  }
}

export default new StudentController();
