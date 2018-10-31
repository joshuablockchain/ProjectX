const express = require('express');
const router = express.Router(); //eslint-di;
const SimpleJsonStore = require('simple-json-store');

router.get('/', (req,res) =>{
    let viewModel = req.viewModel;
    res.render('index.pug', viewModel);
});

router.post('/', function submitNotes(req, res) {
    // Process: Get notes from json -> Add new note -> Save the notes
    let notes = store.get('notes');
    notes.push({
      balance: req.body.balance,
      content: req.body.content,
      author: req.body.author
    });
    store.set('notes', notes);
  
    //- It just reload the page on /
    // More on redirection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
    res.redirect('/');
  });
module.exports = router;
