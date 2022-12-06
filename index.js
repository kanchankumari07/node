const express = require('express');
const app = express();

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};


app.use(express.static('public'));

let movies = [
  {
    "Title":"3 idoits",
    "Director":"Rajkumar Hirani",
    "Genre":"Drama",
  },
  {
    "Title":"Gladiator",
    "Director":"Ridley Scott",
    "Genre":"Action",
  },
  {
    "Title":"IT",
    "Director":"andres Muschietti",
    "Genre":"Horror",
  },

  { "Title":"The Notebook",
  "Director":"Nick Cassavetes",
  "Genre":"Romance",
 },

  { "Title":"Mission Mangal",
  "Director":"Jagan Shakti",
  "Genre":"Science Fiction",
},
{
  "Title":"Encanto",
  "Director":"Byron Howard,Jared Bush",
  "Genre":"Fantasy",
},
{
  "Title":"Shutter Island",
  "Director":"Martin Scorsese",
  "Genre":"Thriller",
},
{
  "Title":"Cruella",
  "Director":"Craig Gillespie",
  "Genre":"Comedy",
},
{
  "Title":"Moana",
  "Director":"Ron clements,John Musker",
  "Genre":"Adventure",
},
{
"Title":"English vinglish",
"Director":"Gauri Shine",
"Genre":"Comedy",
},
]

app.get('/', (req, res) => {
  res.send('Welcome to my top movies list!');
});


app.get('/movies', (req, res) => {
  res.json(movies);
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});



