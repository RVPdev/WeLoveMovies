const knex = require("../db/connection");

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
  }

function update(updatedReview) {
  return knex("reviews") // specify the table name
    .where({ review_id: updatedReview.review_id }) // specify which review to update
    .update(updatedReview, "*") // update the review and return all updated columns
    .then((updatedRows) => updatedRows[0]); // return the first updated row
}


module.exports = {
    update,
}