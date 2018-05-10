const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const notes = [
  'http is a protocol',
  'http requests have a url, method, header, and body'
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static('src/css'));

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.post('/notes', (req, res) => {
  notes.push(req.body.note);
  res.redirect('back');
});

app.listen(port, () => {
  console.log(`Web notes app starting on port ${port}`);
});
