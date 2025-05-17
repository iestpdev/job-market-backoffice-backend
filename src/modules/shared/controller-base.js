import db from "../../config/mysql/mysql.js";

// TODO: cambiar el nombre de la clase por ControllerBase
export class BaseController {
  getDbPool() {
    return db.getPool();
  }
  
  handleError(res, statusCode, err, customMessage = "error in operation") {
    console.log(err)
    res.status(statusCode).json({
      error: customMessage,
      message: err.message,
    });
  }
}