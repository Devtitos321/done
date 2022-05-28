const data = require('../dataBaseModels/balance.js');
const sbd = require('../dataBaseModels/system.js');
const {MessageEmbed, MessageFlags} = require('discord.js');
const mongoose = require('mongoose');
const {owners} = require('../JSON/config.json');

module.exports = {
    name: 'remove',
async execute (client, message, args){
    if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);
 if(isNaN(args[1])) return message.channel.send("الرجاء تحديد قيمه صالحه")
let mention = true
let member = message.mentions.users.first()
if(!member) {
let member1 = await message.guild.members.cache.get(args[0])
if(!member1) return message.lineReply("** لا يمكنني العثور على هذا العضو**"); 
    mention = false
member = member1
}  else {
member =  message.guild.members.cache.get(message.mentions.users.first().id)
}
if(member){
mention = true
}

const balanceofuser = await data.findOne({
  userid: member.id
});

let server = await sbd.findOne({
    guildid: message.guild.id ,
  });
  
  if(!server){
    message.channel.send('لم يتم تحديد روم لوج')
  }
  
  let logs = client.channels.cache.get(server.logschannel);


if(!balanceofuser){
    message.channel.send(`balance of <@${member.id}> is \`0\``)
    let newuser = new data({
        _id: mongoose.Types.ObjectId(),
        userid: member.id,
        balance: 0,
    })
    newuser.save()
    .then(result => consoel.log('new user form give'))
}else{
    let bal = balanceofuser.balance;
    if(args[1] > bal) return message.channel.send(`<@${member.id}> balance is ${bal} sorry`)
    balanceofuser.updateOne({
        balance: balanceofuser.balance - parseInt(args[1])
    })
    .then(result => {console.log(`done remove`)})
    let embed = new MessageEmbed().setColor('BLUE').setDescription(`تم خصم ${args[1]} ألي <@${member.id}> من <@${message.author.id}> `)
    message.channel.send({embeds: [embed]})
    logs.send(`قام <@${message.author.id}> بخصم ${args[1]} الي <@${member.id}>`)
}


}
}    