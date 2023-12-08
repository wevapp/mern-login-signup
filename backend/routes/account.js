const express = require('express')
const router = express.Router()

const {
  getAccounts,
  createAccount
} = require('../controllers/accountController')

// Get all accounts
router.get('/', getAccounts)

// Login user
router.post('/login');

// signup user
router.post('/signup', createAccount);

module.exports = router;