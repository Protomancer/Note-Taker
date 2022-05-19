//const { response } = require('express');
const express = require('express');
const path = require('path');
const fs = require ('fs');

//Initialize app and create the port
const app = express();
const PORT = process.env.PORT || 3001;

//parsing and static folder
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//create a list of routes

//get route
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const dataParsing = JSON.parse(data);
        res.json(dataParsing);
    });
});
//post route
app.post('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const dataParsing = JSON.parse(data);
        const newNotes = req.body;
        dataParsing.push(newNotes);
        fs.writeFile('./db/db.json', JSON.stringify(dataParsing), (err) => {
           if (err) throw err;
           res.json(dataParsing);
       });
    });
});

//delete route

app.get("/api/notes/:id", function(req,res) {
   res.json(notes[req.params.id]);
});

app.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    updateDb();
    console.log("Note Deleted "+req.params.id);
});

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));

