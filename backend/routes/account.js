const express = require('express')
const router = express.Router()

const {
  getAccounts,
  createAccount,
  loginUser
} = require('../controllers/accountController')

// Get all accounts
router.get('/', getAccounts)

// Login user
router.post('/login', loginUser);

// signup user
router.post('/signup', createAccount);

module.exports = router;