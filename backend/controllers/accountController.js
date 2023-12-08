const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Account = require('../models/accountModel')

// Get all account
const getAccounts = async (req, res) => {
  const account = await Account.find({}).sort({createdAt: -1})
  res.status(200).json(account)
};

// Create new account
const createAccount = async (req, res) => {
  const {username, password} = req.body;
  try {
      const account = await Account.create({username, password});
      res.status(200).json({ mssg: 'Created New Account'});
  } catch (error) {
      res.status(400).json({error: error.message});
  }
};

module.exports = {
  getAccounts,
  createAccount
}