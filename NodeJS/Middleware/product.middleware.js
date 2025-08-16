//Global error handler
export function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}

// Catch undefined routes
export function invalidRoute(req, res, next){
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
} 