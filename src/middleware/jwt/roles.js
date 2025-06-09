export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.tipo)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' });
    }
    next();
  };
}
