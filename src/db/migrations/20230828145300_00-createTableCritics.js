// Define the 'up' migration for creating the 'critics' table
exports.up = function (knex) {
  // Use the Knex schema builder to create a new table called 'critics'
  return knex.schema.createTable("critics", function (table) {
    // Create a primary key column called 'critic_id' that auto-increments
    table.increments("critic_id").primary();

    // Create a string column called 'preferred_name' to store the critic's preferred name
    table.string("preferred_name");

    // Create a string column called 'surname' to store the critic's surname
    table.string("surname");

    // Create a string column called 'organization_name' to store the name of the critic's organization
    table.string("organization_name");

    // Create timestamp columns 'created_at' and 'updated_at' to track record creation and updates
    table.timestamps(true, true);
  });
};

// Define the 'down' migration for undoing the changes made by the 'up' migration
exports.down = function (knex) {
  // Use the Knex schema builder to drop the 'critics' table, effectively undoing the 'up' migration
  return knex.schema.dropTable("critics");
};
