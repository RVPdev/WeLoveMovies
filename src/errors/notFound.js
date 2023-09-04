// Define 'notFound' function to handle routes that are not defined in the application
function notFound(req, res, next) {
  // Call the 'next' function with an error object
  next({
    // Set the HTTP status code to 404 (Not Found)
    status: 404,
    // Create an error message that includes the original URL from the request
    message: `Path not found: ${req.originalUrl}`,
  });
}

// Export the 'notFound' function for use in other modules
module.exports = notFound;
