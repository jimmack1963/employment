const express = require('express');

const router = express.Router();

/*
http://localhost:8081/api/v1/movie/11
 */
router.get('/:id', (req, res) => {
  const params = req.parametersWithDefaults;
  const db = req.app.get('db');
  // TODO: ave rating

  db.all(`select
    m."movieId",
    m."imdbId",
    m.title,
    m.genres,   
    m."releaseDate",
    m.budget,
    m.overview as description,
    m.runtime,
    'average rating',
    m.language as "original language",
    m."productionCompanies"
from
    movies m
where movieId = ${req.params.id}
order by m.${params.order}, m."imdbId";`,
  (err, results) => {
    if (err) {
      console.log(err);
      res.json({
        message: `SQLITE error ${err}`
      });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
