const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const uuid = require("uuid");

let Users=[
  {
    "id": "1",
    "name": "Kirti",
    "Movies": []
},

{
    "id": "2",
    "name": "James",
    "password": "1234",
    "email": "Jamesgilmore@gmail.com",
    "birthday": "08-21-1998",
    "Movies": ["english vinglish"]
}

];

let movies = [
  {
    "Title":"3 idoits",
    "Director":{
      "Name":"Rajkumar Hirani",
    },
    "Genre":{
      "Name":"Drama",
    },
  },
  {
    "Title":"Gladiator",
    "Director":{
     "Name":"Ridley Scott",
    },
    "Genre":{
      "Name":"Action",
  },
},
  {
    "Title":"IT",
    "Director":{
      "Name":"andres Muschietti",
    },
    "Genre":{
      "Name":"Horror",
  },
  },
  { 
    "Title":"The Notebook",
  "Director":{
    "Name":"Nick Cassavetes",
  },
  "Genre":{
    "Name":"Romance",
 },
},

  {
     "Title":"Mission Mangal",
  "Director":{
    "Name":"Jagan Shakti",
  },
  "Genre":{
    "Name":"Science Fiction",
},
  },
{
  "Title":"Encanto",
  "Director":{
    "Name":"Byron Howard,Jared Bush",
  },
  "Genre":{
    "Name":"Fantasy",
},
},
{
  "Title":"Shutter Island",
  "Director":{
    "Name":"Martin Scorsese",
  },
  "Genre":{
    "Name":"Thriller",
},
},
{
  "Title":"Cruella",
  "Director":{
    "Name":"Craig Gillespie",
  },
  "Genre":{
    "Name":"Comedy",
},
},
{
  "Title":"Moana",
  "Director":{
    "Name":"Ron clements,John Musker",
  },
  "Genre":{

   "Name":"Adventure",
},
},
{
"Title":"English vinglish",
"Director":{
  Name:"Gauri Shine",
},
"Genre":{
  "Name":"Comedy",
},
},
]

app.use(express.static('public'));
app.use(morgan("common"));
app.use(bodyParser.json());

app.get('/movies',(req, res) => {
  res.status(200).json(movies);
});

app.get('/movies/:title',function (req, res) {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('movie not found');
    }
  })

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;
  if (genre){
      res.status(200).json(genre);
  }else{
      res.status(400).send('genre not found');
  }
})

  app.get('/movies/director/:directorName', (req, res) => {
    const {directorName}= req.params;
    const director= movies.find(movie => movies.Director.Name== directorName).director ;
     
    if (director){
     res.status(200).json(director);
    }else{
     res.status(402).send("no such director was found ");
    }
  })

  app.post('/users', (req, res) => {
    const newUser = req.body;

    if(newUser.name) {
        newUser.id = uuid.v4()
        users.push(newUser);
        res.status(201).json(newUser);
    } else{
        res.status(400).send('name is required');
    }
})

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if(user) {
      user.name = updatedUser.name;
      res.status(201).json(user);
  }else{
      res.status(400).send('user does not exist')
  }
})

app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if(user) {
      user.favoriteMovies.push(movieTitle);
      res.status(201).send(`${movieTitle} has been added to user ${id}'s array`);
  }else{
      res.status(400).send('user does not exist')
  }
})



app.delete('/users/:id/:movieTitle', (res,req) => {
  const{id,movieTitle}= req.params;
  

  let user= users.find(user =>user.id== id);

  if (user){
    user.favoriteMovies=user.favoriteMovies.filter(title =>title!==movieTitle);
    res.status(200).send('${movieName} has been added to ${id} array');
  }else{
    res.status(400).send('no such users')
  }
});

app.delete('/users/:id', (res,req) => {
  const{id,movieTitle}= req.params;
  

  let user= users.find(user =>user.id== id);

  if (user){
    user.favoriteMovies=user.favoriteMovies.filter(title =>title!==movieTitle);
    res.status(200).send('user ${id} has been deleted');
  }else{
    res.status(400).send('no such users')
  }
});
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080,()=> {
    console.log(' running on Port 8080.');
});











