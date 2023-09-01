const knex = require("../db/connection");

async function list() {
  return knex("reviews").select("*");
}

async function readMovie(movie_Id) {
  return knex("reviews as r")
    .select("*")
    .join("critics as c", "r.critic_id", "=", "c.critic_id")
    .where("r.movie_id", Number(movie_Id));
}

async function readReview(review_id) {
  return knex("reviews as r")
    .select("*")
    .where("r.review_id", Number(review_id))
    .first();
}

async function readCritic(critic_id) {
  return knex('critics as c').select('*').where('c.critic_id', critic_id).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(updatedReview) {
  return knex("reviews as r")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => {
      return readReview(updatedReview.review_id).then(setCritic);
    })
    // .then(() => {
    //   return knex("reviews as r")
    //     .join("critics as c", "r.critic_id", "c.critic_id")
    //     .select(["r.*", "c.*"])
    //     .where("r.review_id", updatedReview.review_id);
    // });
}

async function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  readMovie,
  readReview,
  readCritic,
  update,
  destroy,
};
