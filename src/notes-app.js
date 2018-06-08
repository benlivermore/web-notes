const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const notes = [
  'http is a protocol',
  'http requests have a url, method, header, and body'
];


app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static('src/css'));
app.use('/js', express.static('src/js'));

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.delete('/notes/:noteId', (req, res) => {
  const noteId = Number(req.params.noteId);
  if (noteId >= 0 && noteId < notes.length) {
    notes.splice(noteId, 1);
    res.send('Note deleted!');
  } else {
    res.status(404).send('Note does not exist!');
  }
});

app.put('/notes/:noteId', (req, res) => {
  const noteId = Number(req.params.noteId);
  if (noteId >= 0 && noteId < notes.length) {
    notes[noteId] = req.body.note;
    res.send('Note updated!');
  } else {
    res.status(404).send('Note does not exist!');
  }
});

app.post('/notes', (req, res) => {
  notes.push(req.body.note);
  res.send('Note added!');
});

app.listen(port, () => {
  console.log(`Web notes app starting on port ${port}`);
});
