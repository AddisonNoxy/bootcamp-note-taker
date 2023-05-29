const express = require("express");
const path = require("path");
var fs = require("fs");

const notesFile = require("./db/db.json");

const app = express();

const PORT = 3001;

app.use(express.static("public"));

app.get('/', (req, res) => {
    console.log("Root directory found!");
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(notesFile);
})

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received`);
    
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
})