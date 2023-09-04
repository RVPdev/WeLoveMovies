/**
 * Express API error handler.
 */
// Define 'errorHandler' function to centrally handle all errors in the application
function errorHandler(error, request, response, next) {
  // Destructure 'status' and 'message' from the error object
  // If these properties are not provided, default to 500 for 'status'
  // and "Something went wrong!" for 'message'
  const { status = 500, message = "Something went wrong!" } = error;

  // Set the HTTP status code and send the error message in the response
  response.status(status).json({ error: message });
}

// Export the 'errorHandler' function for use in other modules
module.exports = errorHandler;
