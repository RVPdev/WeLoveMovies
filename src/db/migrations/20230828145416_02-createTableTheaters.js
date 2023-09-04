// Define the 'up' migration for creating the 'theaters' table
exports.up = function(knex) {
  // Use the Knex schema builder to create a new table called 'theaters'
  return knex.schema.createTable('theaters', function (table) {
    // Create a primary key column called 'theater_id' that auto-increments
    table.increments('theater_id').primary();
    
    // Create a string column called 'name' to store the theater's name
    table.string('name');
    
    // Create a string column called 'address_line_1' to store the first line of the theater's address
    table.string('address_line_1');
    
    // Create a string column called 'address_line_2' to store the second line of the theater's address (if any)
    table.string('address_line_2');
    
    // Create a string column called 'city' to store the city where the theater is located
    table.string('city');
    
    // Create a string column called 'state' to store the state where the theater is located
    table.string('state');
    
    // Create a string column called 'zip' to store the ZIP code of the theater's location
    table.string('zip');
    
    // Create timestamp columns 'created_at' and 'updated_at' to track when the record was created and last updated
    table.timestamps(true, true);
  });
};

// Define the 'down' migration for undoing the changes made by the 'up' migration
exports.down = function(knex) {
  // Use the Knex schema builder to drop the 'theaters' table, effectively undoing the 'up' migration
  return knex.schema.dropTable("theaters");
};
