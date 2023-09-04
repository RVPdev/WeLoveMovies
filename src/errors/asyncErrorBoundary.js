// Define an 'asyncErrorBoundary' function to handle errors in async functions
function asyncErrorBoundary(delegate, defaultStatus) {
  // Return an Express middleware function
  return (request, response, next) => {
    // Start a new Promise chain
    Promise.resolve()
      // Invoke the delegate function that is passed as a parameter
      // 'delegate' is the actual async middleware function we want to execute
      .then(() => delegate(request, response, next))
      // If an error occurs in the Promise chain
      .catch((error = {}) => {
        // Destructure 'status' and 'message' from the caught error
        // If 'status' is not available, use 'defaultStatus'
        const { status = defaultStatus, message = error } = error;

        // Call the 'next' function with an error object, which
        // allows error-handling middleware to catch and handle this error
        next({
          status,
          message,
        });
      });
  };
}

// Export the 'asyncErrorBoundary' function for use in other modules
module.exports = asyncErrorBoundary;
