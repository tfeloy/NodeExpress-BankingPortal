const express = require('express');
const router = express.Router();
const { accounts } = require('../data');

router.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

router.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

router.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});
  

module.exports = router;