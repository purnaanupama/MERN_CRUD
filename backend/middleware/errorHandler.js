const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message: err.message || "Internal Server Error",
    });
  };
  
  export default errorMiddleware;