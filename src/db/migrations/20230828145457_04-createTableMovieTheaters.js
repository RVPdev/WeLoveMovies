// Define the 'up' migration for creating the 'movies_theaters' table
exports.up = function (knex) {
  // Use the Knex schema builder to create a new table called 'movies_theaters'
  return knex.schema.createTable("movies_theaters", function (table) {
    // Create a foreign key column called 'movie_id' that references the 'movie_id' in the 'movies' table
    table
      .integer("movie_id")
      .unsigned()
      .references("movie_id")
      .inTable("movies");

    // Create a foreign key column called 'theater_id' that references the 'theater_id' in the 'theaters' table
    table
      .integer("theater_id")
      .unsigned()
      .references("theater_id")
      .inTable("theaters");

    // Create a boolean column called 'is_showing' with a default value of 'false' and not nullable
    table.boolean("is_showing").defaultTo(false).notNullable();

    // Define a composite primary key consisting of 'movie_id' and 'theater_id'
    table.primary(["movie_id", "theater_id"]);

    // Create timestamp columns 'created_at' and 'updated_at' to track when the record was created and last updated
    table.timestamps(true, true);
  });
};

// Define the 'down' migration for undoing the changes made by the 'up' migration
exports.down = function (knex) {
  // Use the Knex schema builder to drop the 'movies_theaters' table, effectively undoing the 'up' migration
  return knex.schema.dropTable("movies_theaters");
};
