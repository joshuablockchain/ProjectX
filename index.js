/**
 * @description
 *wallet system
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const SimpleJsonStore = require('simple-json-store');
const walletRouter = require('./server/routers/walletRouter');
const indexRouter = require('./server/routers/indexRouter');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');
app.use((req, res, next) => {
  req.viewModel = {
    balance: 'Card - Note Taking App'
  };
  next();
});

// Note: The order must be maintained here
//
//app.use('/', walletRouter);
app.use('/', indexRouter);
// axios.post('/deposit',(req,re)=>{

// })


app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
