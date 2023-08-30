if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const movieRouter = require("./movies/movies.router");
const theatersRouter = require('./theaters/theaters.router');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/movies', movieRouter);

app.use('/theaters', theatersRouter);


module.exports = app;
