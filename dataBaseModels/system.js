const mongoose = require("mongoose")

const systemschema = mongoose.Schema({
    guildid: String,
    groupCookie: String,
    groupid: String,
    robuxprice: Number,
    boostoff: Number,
    thanksroom: String,
    guideroom: String,
    owner: String,
    boostrole: String,
    clientrole: String,
    limitrobux: Number,
    logschannel: String,
})

module.exports = mongoose.model("system", systemschema);