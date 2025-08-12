import logger from "../config/logger";

function adminAuthenticate(req, res, next) {
  if (!req.user || !req.user.is_admin) {
    logger.warn(`Tentativa de Acesso para administradores pelo usuario: ${req.user.name}`);
    res.status(403).json({ error: 'Acesso restrito a administradores.' });
    return; 
  }
  next();
}

export default adminAuthenticate;