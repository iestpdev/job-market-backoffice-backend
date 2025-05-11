import { BaseController } from "../../shared/controller-base.js";
import Student from "../models/student.model.js";

class StudentController extends BaseController {
  async getAll(req, res) {
    try {
      const students = await Student.getAll(this.getDbPool());
      res.json(students);
    } catch (error) {
      this.handleError(res,500, error, "Error al obtener los estudiantes");
    }
  }
}

export default new StudentController();