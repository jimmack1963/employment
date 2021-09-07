const express = require('express');

const router = express.Router();

// localhost:8081/api/v1/genres
// debugging aid, not in spec
router.get('/', (req, res) => {
  const params = req.parametersWithDefaults;
  const db = req.app.get('db');
  const genres = req.app.get('genres');

  let summarizeGenres = Object.keys(genres)
    .map((key) => {
      const genre = genres[key];
      return {
        name: genre.name,
        id: genre.id,
        count: genre.records.length
      };
    });

  // this does not sort.  Thought it would sort in place
  summarizeGenres = summarizeGenres.sort((a, b) => a.count < b.count);

  res.json({
    message: summarizeGenres
  });
});

module.exports = router;
