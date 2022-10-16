const express = require('express');
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my top movies list!');
});


app.get('/movies', (req, res) => {
  res.json(topmovies);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});



