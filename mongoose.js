// Mongoose.js
var mongoose = require('mongoose');  
var Account = new mongoose.Schema({
  address: String,
  password: String
});
mongoose.model('Transactions', Account);
module.exports = mongoose.model('Transactions');