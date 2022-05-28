const {MessageEmbed} = require('discord.js');
const sbd = require('../dataBaseModels/system.js');
const data = require('../dataBaseModels/balance.js');
const mongoose = require('mongoose');
const {owners} = require('../JSON/config.json')

module.exports = {
    name: 'give',
    
   
    async execute(client, message, args){
      
      if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);
        let usage = new MessageEmbed() .setColor("BLACK").setDescription(`!give (user) (amount)`);  
       if(!args[0]) return message.channel.send(
       {
          embeds: [usage]
       }
       ) 
      //  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());

      let mention = true
      let member = message.mentions.users.first()
      if(!member) {
    let member1 = await message.guild.members.cache.get(args[0])
    if(!member1) return message.channel.send("** لا يمكنني العثور على هذا العضو**"); 
        mention = false
    member = member1
    }  else {
      member =  message.guild.members.cache.get(message.mentions.users.first().id)
    }
    if(member){
    mention = true
    }

let userBal = await data.findOne({
  userid: member.id,
});

let server = await sbd.findOne({
  guildid: message.guild.id ,
});

if(!server){
   return message.channel.send('لم يتم تحديد روم لوج')
}

let logs = client.channels.cache.get(server.logschannel);

if(!userBal){
  let embed = new MessageEmbed()
  .setColor('BLUE')
  .setDescription(`تم تحويل ${args[1]} ألي <@${member.id}> `)
  message.channel.send({embeds: [embed]})
  logs.send({embeds: [embed]})
  const data2 = new data({
    _id: mongoose.Types.ObjectId(),
    userid: member.id,
    balance: Number(args[1]),
  })
  data2.save()
  .then(result => {console.log('done || new user form give')})
}else{
  userBal.updateOne({balance: Number(userBal.balance) + Number(args[1])}).then(result => console.log('done'))
 let embed = new MessageEmbed()
 .setColor('BLUE')
 .setDescription(`تم تحويل ${args[1]} ألي <@${member.id}> `)
 message.channel.send({embeds: [embed]})
 logs.send(`قام <@${message.author.id}> بتحويل ${args[1]} الي <@${member.id}>`)
}


   


    

      



 }
}