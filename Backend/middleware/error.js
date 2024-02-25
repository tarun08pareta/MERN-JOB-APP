// Define a custom error class extending the Error class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  // Middleware function for handling errors
  export const errorMiddleware = (err, req, res, next) => {
    // Set default error message and status code if not provided
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    // Handle specific types of errors
    if (err.name === "CastError") {
      // If MongoDB cast error, set appropriate message and status code
      const message = `Resource not found. Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
    }
    if (err.code === 11000) {
      // If MongoDB duplicate key error, set appropriate message and status code
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
      // If JSON Web Token error, set appropriate message and status code
      const message = `JSON Web Token is invalid, please try again`;
      err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
      // If JSON Web Token expired error, set appropriate message and status code
      const message = `JSON Web Token is expired, please try again`;
      err = new ErrorHandler(message, 400);
    }
  
    // Send error response with status code and message
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
  
  // Export the ErrorHandler class
  export default ErrorHandler;
  