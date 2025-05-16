import db from "../../config/mysql/mysql.js";

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