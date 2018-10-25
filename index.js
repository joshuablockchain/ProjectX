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
const indexRouter = require('./server/routers/indexRouter');


const store = new SimpleJsonStore('./data.json', {newBalance});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// Note: The order must be maintained here
app.use('/', indexRouter);


var deposit = 0;
var withdraw = 0;
var transfer = 0;
var payment = 0;
var newBalance = 0;

app.post('/deposit',(req,res) => {
  deposit = req.body.deposit
  newBalance +=  deposit
  store.set('newBalance', newBalance);
  res.json(newBalance);
})

app.post('/withdraw',(req,res) => {
  withdraw = req.body.withdraw
  newBalance = newBalance -  withdraw
  store.set('newBalance', newBalance);
  res.json(newBalance);
})
/////
app.post('/transfer',(req,res) => {
  transfer = req.body.transfer
  newBalance = newBalance -  transfer
  store.set('newBalance', newBalance);
  res.json(newBalance);
})
//////////
app.post('/payment',(req,res) => {
  payment = req.body.payment
  newBalance = newBalance -  payment
  store.set('newBalance', newBalance);
  res.json(newBalance);
})
///////////

app.get('/',(req,res)=>{
  res.send(`${newBalance}`);
})


app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
