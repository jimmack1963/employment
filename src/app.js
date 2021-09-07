const sqlite3 = require('sqlite3');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const middleware = require('./middleware');
const api = require('./api');
require('dotenv')
  .config();

let db;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(middleware.getParamsWithDefaults);

async function crossRefGenres() {
  const genres = {};
  app.set('genres', genres);
  await db.serialize(async () => {
    await db.each('select movieId, genres  from movies', async (err, row) => {
      if (err) {
        console.log(err.message);
      } else {
        const parsed = JSON.parse(row.genres || []);
        await parsed.forEach(async (genre) => {
          genres[genre.id] = genres[genre.id] || {
            name: genre.name.toLowerCase(),
            id: genre.id,
            records: []
          };
          await genres[genre.id].records.push(row.movieId);
        });
      }
    });
  });
}

app.openDatabase = function (test) {
  const dbPathTest = test ? './test/db/' : path.resolve('.').endsWith('src') ? '../test/db/' : './db/';
  console.log(dbPathTest, test);
  db = new sqlite3.Database(`${dbPathTest}movies.db`, sqlite3.OPEN_READONLY, async (err) => {
    if (err) {
      console.log(`connectForTest to database ${dbPathTest}movies.db from ${path.resolve('.')} test: ${test}`);
      console.error(err.message);
    } else {
      console.log(`connectForTest to database ${dbPathTest}movies.db from ${path.resolve('.')}`);
      await crossRefGenres();
      /* one of many attempts to import ratings, problems with avg & sum
      db.run(`ATTACH DATABASE "${dbPathTest}ratings.db" as ratings`, () => {
        // db.each('select * from ratings', (err, row) => {
        //   console.log(row);
        // });

  //        only one return when in DB browser via webstorm
  //       select title,
  //      -- avg( r.rating ),
  //     sum(r.rating),
  //     m.movieId   from movies m
  // join ratings r
  // on m.movieId = r.movieId
  // where r.movieId is not null
  //   and r.rating is not null

        db.each(`select title,
      avg( r.rating ),
      m.movieId   from movies m
  join ratings r
  on m.movieId = r.movieId
  where r.movieId is not null
--  where r.movieId <> 266
  `,
        (err, row) => {
          if (err) {
            debugger;
            console.log(err.message);
          } else {
            debugger;
            console.log(row);
          }
        },
          () => {
          debugger;
          console.log('done');
          }

        );

      });
      */
    }
  });
  app.set('db', db);
};

app.use('/api/v1', api);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
