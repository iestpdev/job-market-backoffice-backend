import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../../middleware/jwt/jwt.js';

export async function login(conexion, username, password) {
  const [user] = await conexion.query("SELECT * FROM USUARIOS WHERE USERNAME = ? AND deleted_at IS NULL", [username]);

  if (!user.length) throw new Error("Usuario no encontrado");

  const validPassword = await bcrypt.compare(password, user[0].USERPASS);
  if (!validPassword) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    {
      id: user[0].ID,
      tipo: user[0].TIPO,
      companyId: user[0].EMPRESA_ID,
      studentId: user[0].ALUMNO_ID,
    },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return { token, user: { 
    id: user[0].ID, 
    tipo: user[0].TIPO, 
    username: user[0].USERNAME, 
    companyId: user[0].EMPRESA_ID,
    studentId: user[0].ALUMNO_ID 
  }};
}
