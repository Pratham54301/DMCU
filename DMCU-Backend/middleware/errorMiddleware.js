const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error("Multiverse Error Logged:", err);
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Something went wrong.";

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found.";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  if (err.name === "MulterError" || message.includes("Only ")) {
    statusCode = 400;
  }

  if (message.includes("CORS")) {
    statusCode = 403;
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "A record with this value already exists.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};
