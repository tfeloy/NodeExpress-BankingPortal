const fs = require('fs');
const path = require('path');
const { accounts, users, writeJSON } = require('./data'); 
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  const {from, to, amount } = req.body;
  accounts[from].balance -= parseInt(amount);
  accounts[to].balance += parseInt(amount);

  writeJSON();

  res.render('transfer', { message: "Transfer Completed" });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

app.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available += parseInt(amount);

  writeJSON();

  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'));