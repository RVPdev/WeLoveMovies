// Importing the environment variable for the port number, with a default value of 5001 if not specified
const { PORT = 5001 } = process.env;

// Importing the Express application from app.js
const app = require("./app");

// Importing the Knex database connection from db/connection.js
const knex = require("./db/connection");

// Defining a callback function to log the port number when the server starts listening
const listener = () => console.log(`Listening on Port ${PORT}!`);

// Running database migrations to the latest version and starting the server
knex.migrate
  .latest() // Migrate the database to the latest version
  .then((migrations) => {
    // Log information about the migrations that were run
    console.log("migrations", migrations);

    // Start the Express application and begin listening for incoming HTTP requests
    app.listen(PORT, listener);
  })
  .catch(console.error); // Catch any errors and log them to the console
