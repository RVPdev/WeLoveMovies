// Define the 'up' migration for creating the 'reviews' table
exports.up = function(knex) {
    // Use the Knex schema builder to create a new table called 'reviews'
    return knex.schema.createTable("reviews", function (table) {
      // Create a primary key column called 'review_id' that auto-increments
      table.increments('review_id').primary();
      
      // Create a text column called 'content' to store the content of the review
      table.text('content');
      
      // Create an integer column called 'score' to store the score given in the review
      table.integer('score');
      
      // Create a foreign key column called 'critic_id' that references the 'critic_id' in the 'critics' table
      table.integer('critic_id').unsigned().references('critic_id').inTable('critics');
      
      // Create a foreign key column called 'movie_id' that references the 'movie_id' in the 'movies' table
      table.integer('movie_id').unsigned().references('movie_id').inTable('movies');
      
      // Create timestamp columns 'created_at' and 'updated_at' to track when the record was created and last updated
      table.timestamps(true, true);
    });
  };
  
  // Define the 'down' migration for undoing the changes made by the 'up' migration
  exports.down = function(knex) {
    // Use the Knex schema builder to drop the 'reviews' table, effectively undoing the 'up' migration
    return knex.schema.dropTable("reviews");
  };
  