const app = require('./app');
app.openDatabase();
const port = process.env.PORT || 8081;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
