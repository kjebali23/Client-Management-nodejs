const mongoose = require('mongoose');

var Accountschema = new mongoose.Schema({
    email :{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true,
    }
  })

  const Accounts  = mongoose.model('accounts' , Accountschema);
  module.exports = Accounts;