const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoConnectUri = process.env.MONGODB_URI || 'mongodb://localhost/webnotes';
mongoose.connect(mongoConnectUri);

const Note = mongoose.model('note', { text: String });

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
  Note.find().then((notes) => {
    res.render('notes', { notes: notes });
  });
});

app.delete('/notes/:noteId', (req, res) => {
  const noteId = req.params.noteId;
  Note.deleteOne({_id: noteId }).then(() => {
    res.send(`Note ${noteId} deleted!`);
  });
});

app.put('/notes/:noteId', (req, res) => {
  const noteId =req.params.noteId;
  Note.updateOne({_id: noteId }, { text: req.body.note}).then(() => {
    res.send(`Note ${noteId} updated!`);
  });
});

app.post('/notes', (req, res) => {
  notes.push(req.body.note);
  const newNote = new Note({text: req.body.note});
  newNote.save().then(() => {
    res.send('Note added!');
  }).catch(() => {
    res.status(500).send();
  });
});

app.listen(port, () => {
  console.log(`Web notes app starting on port ${port}`);
});
