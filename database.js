const mongoose = require('mongoose');

module.exports = {
    init: () => {
       dbOption ={
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
        autoIndex: false
       }
      
       // mongoose.connect(`mongodb+srv://ZIAD:ZIAD@cluster0.qizpg.mongodb.net/ROBUXSYSTEM`)
       mongoose.connect(`mongodb+srv://ROBUX:ROBUX@databasediscordbot.tbvah.mongodb.net/test`)
       mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', async () => {
        console.log("connected to data base")
        });
       
        mongoose.connection.on('disconnected', async () => {
            console.log("disconnected to data base")
        });
        


      mongoose.connection.on('error', async () => {
                console.log("error while connecting to data base")
        })

    }
}