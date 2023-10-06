const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getData, writeData } = require('./db');
const path = require('path');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.static('public'));
app.use(express.json());

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = getData();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const notes = getData();

  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  }

  notes.push(newNote);
  writeData(notes);
  res.json({ message: 'DB updated successfully!' });
});

app.delete('/api/notes/:id', (req, res) => {
  const notes = getData();
  const id = req.params.id;

  // CAN THESE BE
  const deleteItem = notes.find(note => note.id === id);
  const newNotes = notes.filter(note => note.id !== deleteItem.id)
  // const newNotes = notes.filter(note => note.id !== notes.find(note => note.id === id)?.id)

  writeData(newNotes);

  res.json({  message: 'DB updated successfully!' })

});

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);