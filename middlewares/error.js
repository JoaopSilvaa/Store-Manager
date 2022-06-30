module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400)
      .json({ message: err.details[0].message });
  }
  const statusByErrorCode = {
    notFound: 404,
    unprocessable: 422,
  };
  const status = statusByErrorCode[err.code] || 500;
  res.status(status).json({ message: err.message });
};