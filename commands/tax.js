const {MessageEmbed} = require('discord.js');
const { message } = require('noblox.js');
const data = require('../dataBaseModels/system.js');


module.exports= {
    name: 'tax',
    async execute(client, message, args){
      const data2 = await data.findOne({
        guildid: message.guild.id,
      })
      if(!data2){
        return message.channel.send("لم يتم تسجيل معلومات الجروب")
      }
      if(args[1]){
        if(isNaN(args[1])) return message.channel.send("**!tax (number) (number)**");
        let price = args[1];
        if(isNaN(args[0])) return message.channel.send("**!tax (number)**");
        let tax = parseInt(args[0]) * price * 20 /19 + 1;
        let embed = new MessageEmbed()
        .setColor('BLUE')
        .addField('ROBUX WITH TAX', `\`\`\`${parseInt(tax)}\`\`\`price is \`${args[1]}\``)
        return message.channel.send({embeds: [embed]});  
    
      }

if(!args[1]) {
  let price = data2.robuxprice;
  if(isNaN(args[0])) return message.channel.send("**!tax (number)**");
  let tax = parseInt(args[0]) * price * 20 /19 + 1;
  let embed = new MessageEmbed()
  .setColor('BLUE')
  .addField('ROBUX WITH TAX', `\`\`\`${parseInt(tax)}\`\`\``)
  message.channel.send({embeds: [embed]});  
}

}
}
