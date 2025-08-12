import logger from "../config/logger";

export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  logger.error({
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    path: req.originalUrl,
    method: req.method
  });

  if(res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
}