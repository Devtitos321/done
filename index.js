const discord = require('discord.js');
const { Client, Intents, Collection } = require('discord.js');
const {TOKEN, PREFIX, server, owners} = require('./JSON/config.json');
const config = require('./JSON/config.json');
const { readdirSync, readFile } = require('fs');
const mongoose = require('./database')
const data = require('./dataBaseModels/balance.js');
const { db } = require('./dataBaseModels/system');
const mongo = require('mongoose')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
});

client.commands = new Collection();
client.prefix = PREFIX;


mongoose.init()

client.on('ready', () => {
    console.log(`${client.user.tag} is ready`)
})


for (let file of readdirSync('commands')) {
  const pull = require('./commands/' + file);

  client.commands.set(pull.name, pull);
}


client.on("messageCreate", message => {
   
  


  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  try {
      let commandFiles = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
      if (!commandFiles) return;
      commandFiles.execute(client, message, args)
  } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
  }


});
client.on('guildMemberAdd', async(member) => {

    let userprofile = await data.findOne({
        userid: member.id,
    })
    if(!userprofile){
        const newU = new data({
            _id: mongo.Types.ObjectId(),
            userid: member.id,
            balance: 0,
        })
        newU.save().then(result => {console.log('new user add to data from joining')})
    }

})

client.login(TOKEN)