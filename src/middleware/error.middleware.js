module.exports = (err, req, res, next) => {
  console.error(err.stack); // For debugging during development

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode
    }
  });
};
