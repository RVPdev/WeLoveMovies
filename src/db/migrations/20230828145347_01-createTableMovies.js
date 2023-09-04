// Define the 'up' migration for creating the 'movies' table
exports.up = function(knex) {
    // Use the Knex schema builder to create a new table called 'movies'
    return knex.schema.createTable("movies", function (table) {
      // Create a primary key column called 'movie_id' that auto-increments
      table.increments('movie_id').primary();
      
      // Create a string column called 'title' to store the movie's title
      table.string('title');
      
      // Create an integer column called 'runtime_in_minutes' to store the movie's runtime
      table.integer('runtime_in_minutes');
      
      // Create a string column called 'rating' to store the movie's rating
      table.string('rating');
      
      // Create a text column called 'description' to store the movie's description
      table.text('description');
      
      // Create a string column called 'image_url' to store the URL of the movie's image
      table.string('image_url');
      
      // Create timestamp columns 'created_at' and 'updated_at' to track record creation and updates
      table.timestamps(true, true);
    });
  };
  
  // Define the 'down' migration for undoing the changes made by the 'up' migration
  exports.down = function(knex) {
    // Use the Knex schema builder to drop the 'movies' table, effectively undoing the 'up' migration
    return knex.schema.dropTable("movies");
  };
  