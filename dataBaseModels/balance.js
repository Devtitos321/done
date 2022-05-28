const mongoose = require("mongoose")

const balanceschema = mongoose.Schema({
  userid: String,
  balance: Number,

})

module.exports = mongoose.model("balance", balanceschema);