const express = require('express');
const movies = require('./movies');
const movie = require('./movie');
const year = require('./year');
const genre = require('./genre');
const genres = require('./genres');

const router = express.Router();

router.use('/genres', genres);
router.use('/genre', genre);
router.use('/year', year);
router.use('/movie', movie);
router.use('/movies', movies);

module.exports = router;
