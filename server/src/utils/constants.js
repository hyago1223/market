export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Erro interno do servidor' });
}