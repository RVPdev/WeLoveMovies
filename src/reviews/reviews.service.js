const knex = require("../db/connection");

function list() {
  return knex("reviews").select("*");
}

function readMovie(movie_Id) {
  return knex("reviews as r")
    .select("*")
    .join("critics as c", "r.critic_id", "=", "c.critic_id")
    .where("r.movie_id", Number(movie_Id));
}

function readReview(review_id) {
  return knex("reviews as r")
    .select("*")
    .where("r.review_id", Number(review_id))
    .first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => {
      return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select(["r.*", "c.*"])
        .where("r.review_id", updatedReview.review_id);
    });
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  readMovie,
  readReview,
  update,
  destroy,
};
