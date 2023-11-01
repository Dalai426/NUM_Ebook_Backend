const ApiError = require("../error/apiError");

const ErrorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({ error: { code: err.code, message: err.message } });
    return;
  }
  res.status(500).json("Өөө, Сервер алдаатай байх шиг байна ааа !!!");
};

module.exports = ErrorHandlerMiddleWare;