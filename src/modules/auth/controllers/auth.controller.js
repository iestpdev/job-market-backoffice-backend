import { BaseController } from '../../shared/controller-base.js';
import { login } from '../services/auth.service.js';

class AuthController extends BaseController{
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const result = await login(this.getDbPool(), username, password);
      res.json(result);
    } catch (err) {
      this.handleError(res, 401, err, "Autenticación fallida.")
    }
  }
}

export default new AuthController();
