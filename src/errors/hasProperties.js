/**
 * Creates a middleware function that validates that req.body.data has the specified non-falsey properties.
 * @param properties
 *  one or more property name strings.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the specified non-falsey properties.
 */
// Define 'hasProperties' function to check if certain properties exist in the request body
function hasProperties(...properties) {
  // Return another function which will be used as middleware in your routes
  return function (res, req, next) {
    // Destructure 'data' from the request body. If not present, default to an empty object
    const { data = {} } = res.body;

    try {
      // Loop over each property specified in '...properties'
      properties.forEach((property) => {
        // Get the value of the property from 'data'
        const value = data[property];

        // If the value is not present, throw an error
        if (!value) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });

      // If all properties exist, move to the next middleware
      next();
    } catch (error) {
      // If an error is caught, forward it to the next middleware
      next(error);
    }
  };
}

// Export the 'hasProperties' function for use in other modules
module.exports = hasProperties;
