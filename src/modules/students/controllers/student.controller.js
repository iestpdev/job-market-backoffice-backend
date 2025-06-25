import { BaseController } from "../../shared/controller-base.js";
import Student from "../models/student.model.js";
import { studentSchema } from "../validators/student.validator.js";
import uploadFileToSupabase from "../../../config/supabase/upload-file.js";
import dotenv from "dotenv";
dotenv.config();

class StudentController extends BaseController {
  async getAll(_, res) {
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
      const { error: validationError, value } = studentSchema.validate(req.body);
      if (validationError) return res.status(400).json({ message: "Validación fallida", details: validationError.details });

      const student = new Student(
        null,
        value.apellidos,
        value.nombres,
        value.genero,
        value.fechNac,
        value.tipoDOI,
        value.numDOI,
        value.programaEstudio,
        value.esEgresado,
        null
      );

      const result = await student.create(this.getDbPool());
      const newId = result.insertId;

      if (req.file) {
        const curriculumUrl = await uploadFileToSupabase(
          process.env.SUPABASE_BUCKET_FILES,
          req.file,
          "students",
          newId
        );

        await Student.updateCurriculum(this.getDbPool(), newId, curriculumUrl);
      }

      res.status(201).json({ message: "Estudiante creado", id: newId });
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
        apellidos: req.body?.apellidos || existingStudent.APELLIDOS,
        nombres: req.body?.nombres || existingStudent.NOMBRES,
        genero: req.body?.genero || existingStudent.GENERO,
        fechNac: req.body?.fechNac || existingStudent.FECH_NACIMIENTO,
        tipoDOI: req.body?.tipoDOI || existingStudent.TIPO_DOI,
        numDOI: req.body?.numDOI || existingStudent.NUM_DOI,
        programaEstudio: req.body?.programaEstudio || existingStudent.PROGRAMA_ESTUDIO,
        esEgresado: req.body?.esEgresado || existingStudent.ES_EGRESADO,
      };

      const { error, value } = studentSchema.validate(mergedData);
      if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });

      let curriculumUrl = existingStudent.CURRICULUM;
      if (req.file) {
        curriculumUrl = await uploadFileToSupabase(
          process.env.SUPABASE_BUCKET_FILES,
          req.file,
          'students',
          id
        );
      }

      const student = new Student(
        id,
        value.apellidos,
        value.nombres,
        value.genero,
        value.fechNac,
        value.tipoDOI,
        value.numDOI,
        curriculumUrl
      );

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
      if (!student) return res.status(404).json({ message: "Estudiante no encontrado" });

      const result = await Student.softDelete(this.getDbPool(), id);
      if (result.affectedRows <= 0) return res.status(404).json({ message: "error al eliminar Estudiante" });

      res.json({ message: "Estudiante eliminado (soft delete)" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al eliminar el estudiante");
    }
  }
}

export default new StudentController();
