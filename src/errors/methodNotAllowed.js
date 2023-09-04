// Define 'methodNotAllowed' function to handle HTTP methods that are not supported for a particular route
function methodNotAllowed(req, res, next) {
  // Call the 'next' function with an error object
  next({
    // Set the HTTP status code to 405 (Method Not Allowed)
    status: 405,
    // Create an error message using the request's method and original URL
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

// Export the 'methodNotAllowed' function for use in other modules
module.exports = methodNotAllowed;
