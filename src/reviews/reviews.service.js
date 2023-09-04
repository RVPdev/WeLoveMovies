// Import the Knex connection
const knex = require("../db/connection");

// List all reviews
async function list() {
  return knex("reviews").select("*");
}

// Read reviews for a specific movie, joined with the critic data
async function readMovie(movie_Id) {
  return knex("reviews as r")
    .select("*")
    .join("critics as c", "r.critic_id", "=", "c.critic_id")
    .where("r.movie_id", Number(movie_Id));
}

// Read a specific review by its ID
async function readReview(review_id) {
  return knex("reviews as r")
    .select("*")
    .where("r.review_id", Number(review_id))
    .first();
}

// Read critic information by its ID
async function readCritic(critic_id) {
  return knex('critics as c').select('*').where('c.critic_id', critic_id).first();
}

// Add critic information to a review
async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

// Update a review and then read the updated review
async function update(updatedReview) {
  return knex("reviews as r")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return readReview(updatedReview.review_id).then(setCritic);
    });
}

// Delete a review by its ID
async function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

// Export all functions for use in other modules
module.exports = {
  list,
  readMovie,
  readReview,
  readCritic,
  update,
  destroy,
};
