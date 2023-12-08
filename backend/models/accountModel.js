const mongoose = require('mongoose');
const Schema = mongoose.Schema

const accountSchema = new Schema({
  username: {
      type: String,
      required: true,
      unique: true,
  },
  password: {
      type: String,
      required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema) // Account is a collection name