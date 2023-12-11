const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const Account = require('../models/accountModel');

// Get all accounts
const getAccounts = async (req, res) => {
  const account = await Account.find({}).sort({ createdAt: -1 });
  res.status(200).json(account);
};

// Create new account with hashed password
const createAccount = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new account with the hashed password
    const account = await Account.create({ username, password: hashedPassword });
    res.status(200).json({ mssg: 'Created New Account' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Account.findOne({ username });

    if (user) {
      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Generate a token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  loginUser,
};
