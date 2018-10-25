/**
 * @description
 *wallet system
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const notesRouter = require('./server/routers/notesRouter');
const port = 3000;

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.viewModel = {
    title: 'Wallet System'
  };
  next();
});

app.use(express.static('public'));

// NOTE: The __dirname is important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  let viewModel = req.viewModel;
  res.render('index.pug', viewModel);
});


app.use('/api/notes', notesRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
