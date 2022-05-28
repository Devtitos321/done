const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'help',
async execute (client, message, args){
  let Embed = new MessageEmbed()
  .setTitle('ROBUX HELP COMMAND')
  .addField(`balance command`, `\`\`\`${client.prefix}balance\`\`\``)
  .addField(`transfer command`, `\`\`\`${client.prefix}transfer\`\`\``)
  .addField(`trade command`, `\`\`\`${client.prefix}trade\`\`\``)
  .addField(`tax command`, `\`\`\`${client.prefix}tax\`\`\``)
  .setFooter(`Requested by: ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
  .setTimestamp()

  message.channel.send({embeds: [Embed]})

   
   
 
       
       

     
    }
}