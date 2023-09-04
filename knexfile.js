// Import the path module to handle file and directory paths
const path = require("path");

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Destructure the DATABASE_URL from the environment variables
const { DATABASE_URL } = process.env;

// Export the configuration object
module.exports = {
  // Configuration for development environment
  development: {
    // Specify the database client to use
    client: "postgresql",
    // Database connection string
    connection: DATABASE_URL,
    // Connection pool settings: minimum and maximum number of connections
    pool: { min: 0, max: 5 },
    // Location of migration files
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    // Location of seed files
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  // Configuration for production environment (similar to development)
  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  // Configuration for test environment
  test: {
    // Use SQLite as the database client for tests
    client: "sqlite3",
    // Use an in-memory database for tests
    connection: {
      filename: ":memory:",
    },
    // Location of migration files for tests
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    // Location of seed files for tests
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    // Use NULL as the default value for SQLite columns
    useNullAsDefault: true,
  },
};
