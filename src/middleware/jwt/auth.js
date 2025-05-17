import jwt from 'jsonwebtoken';
import jwtConfig from './jwt.js';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = decoded;
    next();
  });
}
