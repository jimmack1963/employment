const request = require('supertest');
const assert = require('assert');
const app = require('../src/app');

describe('GET /api/v1/movies', () => {
  it('returns a page of movies', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 50);
        const rec = res.body[0];
        assert.equal(rec.title, '13 Frightened Girls'); // first alphabetically
        return done();
      });
  });
});

describe('GET /api/v1/movies with options', () => {
  it('accepts a limit parameter', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movies?limit=3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 3);
        const rec = res.body[0];
        assert.equal(rec.title, '13 Frightened Girls'); // first alphabetically
        return done();
      });
  });
  it('respects pagination', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movies?limit=3&page=2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 3);
        const rec = res.body[0];
        assert.equal(rec.title, '55 Days at Peking'); // first alphabetically
        return done();
      });
  });
  it('can find the same record using different pagination', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movies?limit=6&page=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 6);
        const rec = res.body[3]; // also found using limit 3 page 2
        assert.equal(rec.title, '55 Days at Peking'); // first alphabetically
        return done();
      });
  });
  it('can reverse the default sort order', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movies?limit=3&desc=true')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 3);
        const rec = res.body[0];
        assert.equal(rec.title, 'Zatôichi the Fugitive'); // first alphabetically
        return done();
      });
  });
  it('can sort on any field', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movies?limit=3&order=releaseDate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 3);
        const rec = res.body[0];
        assert.equal(rec.title, 'So Evil, So Young'); // first alphabetically
        return done();
      });
  });
});

describe('GET /api/v1/movie/657', () => {
  it('returns From Russia with Love', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/movie/657')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          movieId: 657,
          imdbId: 'tt0057076',
          title: 'From Russia with Love',
          genres: '[{"id": 28, "name": "Action"}, {"id": 53, "name": "Thriller"}, {"id": 12, "name": "Adventure"}]',
          releaseDate: '1963-10-11',
          budget: 2000000,
          description: 'Agent 007 is back in the second installment of the James Bond series, this time battling a secret crime organization known as SPECTRE. Russians Rosa Klebb and Kronsteen are out to snatch a decoding device known as the Lektor, using the ravishing Tatiana to lure Bond into helping them. Bond willingly travels to meet Tatiana in Istanbul, where he must rely on his wits to escape with his life in a series of deadly encounters with the enemy',
          runtime: 115,
          "'average rating'": 'average rating',
          'original language': null,
          productionCompanies: '[{"name": "United Artists", "id": 60}, {"name": "Eon Productions", "id": 7576}, {"name": "Danjaq", "id": 10761}]'
        }
      ], done);
  });
});

describe('GET /api/v1/year/1963', () => {
  it('returns all 233 movies for the year 1963', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/year/1963?limit=2000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 233);
        const rec = res.body[0];
        assert.equal(rec.title, '13 Frightened Girls'); // first alphabetically
        return done();
      });
  });
});

describe('GET /api/v1/year/3000', () => {
  it('will not find missing years', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/year/3000?limit=2000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 0);
        return done();
      });
  });
});

describe('GET /api/v1/genre', () => {
  it('find genre by id', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/genre/28')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 22);
        const rec = res.body[0];
        assert.equal(rec.title, '55 Days at Peking'); // first alphabetically
        return done();
      });
  });
  it('find genre by name', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/genre/aCtIon')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.length, 22);
        const rec = res.body[0];
        assert.equal(rec.title, '55 Days at Peking'); // first alphabetically
        return done();
      });
  });

  it('will not find for bad genre', (done) => {
    // this.timeout(9000);
    request(app)
      .get('/api/v1/genre/pimplepopping')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Genre not found: pimplepopping' }, done);
  });
});
