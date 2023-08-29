if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const movieRouter = require("./movies/movies.router");
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/movies', movieRouter);


module.exports = app;
