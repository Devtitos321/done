const data = require('../dataBaseModels/balance.js');
const {MessageEmbed, MessageFlags} = require('discord.js');
const mongoose = require('mongoose');
const {owners} = require('../JSON/config.json');

module.exports = {
    name: 'balance',
async execute (client, message, args){


    
let balanceofuser = await data.findOne({
    userid: message.author.id
  });

    if(!balanceofuser) {
        let newUser = new MessageEmbed()
        .setDescription(`**you current balance is \`0\`**`)
      
        
        message.channel.send({embeds: [newUser]})
        const myData = new data({
            _id: mongoose.Types.ObjectId(),
            userid: message.author.id,
            balance: 0,
        });
        myData.save()
        .then(item => {
          console.log(`new user data just add to database`);
        })

    }else if(!args[0]){
      let embed = new MessageEmbed()
      .setColor(client.color)
      .setDescription(`**you current balance is \`${balanceofuser.balance}\`**`)
      
       message.channel.send({embeds: [embed]});
    }

     if(args[0]){
      if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

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
    let userdata = await data.findOne({
      userid: member.id,
    })
    if(!userdata) {
      let newUser = new MessageEmbed()
      .setDescription(`**<@${member.id}> balance is\`0\`**`)
      message.channel.send({embeds: [newUser]})
     
      const userdata2 = new data({
          _id: mongoose.Types.ObjectId(),
          userid: member.id,
          balance: 0,
      });
      userdata2.save()
      .then(item => {
        console.log(`new user data just add to database from balance`);
      })
    }else{
      let newUser = new MessageEmbed()
      .setDescription(`**<@${member.id}> balance is\`${userdata.balance}\`**`)
      message.channel.send({embeds: [newUser]})
    }
  }
}
}