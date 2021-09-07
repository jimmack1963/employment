const express = require('express');

const router = express.Router();

/*
localhost:8081/api/v1/genre/10751
localhost:8081/api/v1/genre/10751?page=1
localhost:8081/api/v1/genre/10751?page=2
localhost:8081/api/v1/genre/family
localhost:8081/api/v1/genre/junk
 */
router.get('/:genre', (req, res) => {
  const params = req.parametersWithDefaults;
  const db = req.app.get('db');
  const genres = req.app.get('genres');

  let matchGenre = false;
  if (req.params.genre) {
    let genreSummary;
    const requestedGenre = req.params.genre.toLowerCase();
    if (requestedGenre in genres) {
      genreSummary = genres[requestedGenre];
    } else {
      genreSummary = Object.values(genres)
        .find((g) => g.name === requestedGenre);
    }
    if (genreSummary) matchGenre = genreSummary.records.join(',');
  }

  if (!matchGenre) {
    res.json({
      message: `Genre not found: ${req.params.genre}`
    });
    return;
  }

  db.all(`select
     m."movieId",
    m."imdbId",
    m.title,
    m.genres,
    m."releaseDate",
    m.budget
from
    movies m
where movieId in (${matchGenre})
order by m.${params.order}, m."imdbId"    
limit ${params.limit} offset ${params.offset};`,
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
