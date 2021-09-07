const express = require('express');

const router = express.Router();

/*
http://localhost:8081/api/v1/movies
http://localhost:8081/api/v1/movies?page=1&order=title
http://localhost:8081/api/v1/movies?page=2&order=title
http://localhost:8081/api/v1/movies?page=1&order=title&limit=4
http://localhost:8081/api/v1/movies?page=1&order=title&limit=4&desc=true

http://localhost:8081/api/v1/movies?page=1&order=releaseDate
http://localhost:8081/api/v1/movies?page=2&order=releaseDate
http://localhost:8081/api/v1/movies?page=2&order=releaseDate&limit=10
 */
router.get('/', (req, res) => {
  const params = req.parametersWithDefaults;
  const db = req.app.get('db');

  db.all(
    `select
    m."movieId",
    m."imdbId",
    m.title,
    m.genres,
    m."releaseDate",
    m.budget
from
    movies m
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
    }
  );
});

module.exports = router;
