/**
 * notesRouter.js
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json', {newBalance,transaction:[]});
// Note: The order must be maintained here
var deposit = 0;
var withdraw = 0;
var transfer = 0;
var payment = 0;
var newBalance = 0;

router.get('/transaction', (req, res, next) => {
  console.log('Index page only');
  next();
}, (req, res) => {
  res.json(store.get('transaction'));
});

router.get('/:id', (req, res) => {
  let transac = {};
  const transaction = store.get('transaction');
  transac = transaction.find(transaction => transaction.id === req.params.id);
  res.json(transac);
});

router.post('/transaction', (req, res) => {
  const transaction = store.get('transaction');
  const newTransac = {
    id: transaction.length > 0 ? transaction[transaction.length - 1].id + 1 : 1,
    newBalance: req.body.newBalance
  };

  transaction.push(newTransac);
  store.set('transaction', transaction);

  res.json(transaction);
});



router.post('/deposit',(req,res) => {
  deposit = req.body.deposit;
  newBalance = Number(newBalance) + Number(deposit);
  store.set('newBalance', newBalance);
  res.json(newBalance);
});


router.post('/withdraw',(req,res) => {
  withdraw = req.body.withdraw;
  newBalance = Number(newBalance) - Number(withdraw);
  store.set('newBalance', newBalance);
  res.json(newBalance);
})
/////
router.post('/transfer',(req,res) => {
  transfer = req.body.transfer;
  newBalance = Number(newBalance) - Number(transfer);
  store.set('newBalance', newBalance);
  res.json(newBalance);
})
//////////
router.post('/payment',(req,res) => {
  payment = req.body.payment;
  newBalance = Number(newBalance) - Number(payment);
  store.set('newBalance', newBalance);
  res.json(newBalance);
})
///////////

router.get('/',(req,res)=>{
    let viewModel = req.viewModel;
    viewModel.newBalance = store.get('newBalance');
    res.render('index.pug', viewModel);
  res.send(`${newBalance}`);
})



module.exports = router;
