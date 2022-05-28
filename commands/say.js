const {owners} = require('../JSON/config.json');

module.exports = {
    name: 'say',
    aliases: ['s'],
async execute (client, message, args){    
    
 if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

   let toSay = args.join(" ")
   message.delete()
   message.channel.send(toSay)



  }
}