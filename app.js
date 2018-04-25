// app.js
var express = require('express')
var app = express()
// var db=require('./db')                       
// ADD THESE TWO LINES
var web3controller = require('./tryEtherium');
app.use('/webconnection', web3controller);

app.use(express.static(__dirname + './View'));

app.use(express.static(__dirname + './Script'));
//Store all JS and CSS in Scripts folder.

// var newContract = require('./Script/newContractDeployWithStableWeb3jsVersion');
// app.use('/newContract', newContract);

// app.user('/currency',CurrencyController)
module.exports = app;