const data = require('../dataBaseModels/balance.js');
const {MessageEmbed} = require('discord.js');
const discord = require('discord.js')
const mongoose = require('mongoose');

module.exports = {
    name: 'trade',
async execute (client, message, args){


    if(!args[0]) {
        let usage = new discord.MessageEmbed().setColor(client.color).setDescription(`**!trade (user) (amount)**`)
        return message.channel.send({embeds: [usage]})
    }
        
    let mention = true
    let member = message.mentions.users.first()
    let user = message.author;
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
      
    
    
     var balanceuser = await data.findOne({
          userid: message.author.id
      });
       
      let usage1 = new discord.MessageEmbed().setColor(client.color).setDescription(`**!trade (user) (amount)**`);
     if(isNaN(args[1])) return message.channel.send({embeds: [usage1]})
      if(!args[1]) return message.channel.send({embeds: [usage1]})
      if(args[1] > balanceuser.balance) return message.channel.send("**رصيدك غير كافي لاتمام هذه العمليه**");
      if(args[1] < 5) return message.channel.send("**اقل عدد للتحويل هو **" + '`5`');
      if(args[1] > 10000) return message.channel.send("**اعلي عدد للتحويل هو **" + '`9999`');
      if (member.id === message.author.id) return message.channel.send("** لا يمكنك تحويل روبوكس لنفسك**");
      if(message.mentions.users.first().bot) return message.channel.send("**البوتات ليس لديها حساب**")
    
    let tradeUser = await data.findOne({
      userid: member.id,
    })

      

  if(!tradeUser){
    balanceuser.updateOne({balance: Number(balanceuser.balance) - Number(args[2])}).then(result => console.log("result")).catch(err => console.log(err))   
    
    const dataaa = new data({
    _id: mongoose.Types.ObjectId(),
    userid: member.id,
    balance: Number(args[1]),
    buy: false,
    }); dataaa.save().then(result => console.log("result")).catch(err => console.log(err));
  
    var donenew = new discord.MessageEmbed()
    .setColor('black')
    .addField('**التحويل من**', `${message.author}`, true)
    .addField('**المستلم**', `${member}`, true)
    .addField('**العدد الذي تم تحويله**', `${args[1]}`, true)
    .addField('**الوسيط**', `${client.user.tag}`, true)
    .setFooter('Trade command bill || new user account' )
    return message.channel.send({embeds: [donenew]})
    
  }else{
    
    let balancemember = balanceuser.balance
    
    balanceuser.updateOne({balance: parseInt(balanceuser.balance) - parseInt(args[1])}).then(result => console.log("result")).catch(err => console.log(err))
    
    tradeUser.updateOne({balance: Number(tradeUser.balance) + Number(args[1])}).then(result => console.log("result")).catch(err => console.log(err))
    
    
    let bal = parseInt(tradeUser.balance) + parseInt(args[1])
    var done = new discord.MessageEmbed()
    .setColor('black')
    .addField('**التحويل من**', `${message.author}`, true)
    .addField('**المستلم**', `${member}`, true)
    .addField('**العدد الذي تم تحويله**', `${args[1]}`, true)
    .addField('**الوسيط**', `${client.user.tag}`, true)
    .addField('رصيد المستلم بعد التحويل ', `${bal}`, true)
    .setFooter('Trade command bill' )
    return message.channel.send({embeds: [done]})
      
  }
    

    
    


    
 
  
   









}}