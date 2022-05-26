//Requirements
const express = require('express');
const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Server } = require('http');

//Initialize app and create the port
const app = express();
const PORT = process.env.PORT || 3001;

let notes = [];


//parsing and static folders
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Homepage Route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Feedback Route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//create a list of routes

//Main get route
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const dataParsing = JSON.parse(data);
    res.json(dataParsing);
  });
});
//main post route
app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const dataParsing = JSON.parse(data);
    const newNotes = req.body;
    console.table(newNotes)
    newNotes.id = Math.floor(Math.random() * 1000);
    console.table(newNotes)

    dataParsing.push(newNotes);
    fs.writeFile('./db/db.json', JSON.stringify(dataParsing), (err) => {
      if (err) throw err;
      res.json(dataParsing);
    });
  });
});



//delete route unfinished
app.delete('api/notes/:id', (req, res) =>{
  fs.readFile('./db/db.json', 'utf-8', (err, data) =>{
    const { id } = req.params;
    const isDeleted = notes.find(note => note.id === id);
    if (isDeleted){
      console.log(deleted);
      notes = notes.filter(notes => notes.id ==! id);
      res.status(200).json(isDeleted);
    } else {
      console.log(deleted);
      res
        .status(404)
        .json({message: 'The note your trying to delete cannot be found'});
    }
  });
});


app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));

