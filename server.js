const express = require("express");
const path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const notesFile = require("./db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(express.json()); //parses application/json
app.use(express.urlencoded({extended: true}));

//create GET route for main directory
app.get('/', (req, res) => {
    console.log("Root directory found!");
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//create GET route for the notes file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

//GET route to return the notes which have been posted in db.json
app.get('/api/notes', (req, res) => {
    res.json(notesFile);
})

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received`);
    console.log(req.body);
    
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {

            const { title, text } = req.body; //separate note contents into unique variables
            const allNotes = JSON.parse(data);

            const newNote = {
                title,
                text,
                id: uuidv4() //apply a unique id to the note
            }

            allNotes.push(newNote);

            fs.writeFile('./db/db.json',
                JSON.stringify(allNotes, null, 4), (writeErr) => {
                    writeErr
                        ? console.error(writeErr)
                        : console.info("Added your note!");
                });

            const response = {
                status: 'success',
                body: newNote
            }

            console.log(response);
            res.status(201).json(response);
        }
    })

})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
})