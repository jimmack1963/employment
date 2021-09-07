const express = require('express');

const router = express.Router();

/*
http://localhost:8081/api/v1/year/1963
 */
router.get('/:year', (req, res) => {
  const params = req.parametersWithDefaults;
  const db = req.app.get('db');
  const yearEnd = req.params.year ? (req.params.year + 1).toString() : 99999

  db.all(`select
     m."movieId",
    m."imdbId",
    m.title,
    m.genres,
    m."releaseDate",
    m.budget
from
    movies m
where m."releaseDate" > ${req.params.year}
and m."releaseDate" < ${yearEnd}
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
