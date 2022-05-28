const {MessageEmbed} = require('discord.js');
const sdb = require('../dataBaseModels/system.js');

module.exports = {
    name: 'credits',
    aliases: ['c'],
async execute (client, message, args){



    let system = await sdb.findOne({
        guildid: message.guild.id,
      })
      if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");
    

      let price = parseInt(system.robuxprice);
      let have = parseInt(args[0]);
      let amount = have / price;
      let probottxa =Number(amount) * parseInt(price) * 20 / 19 + 1;

      if(isNaN(have) || Number(have) < Number(price) ) return message.channel.send("الرجاء تحديد عدد صحيح");

      
        let embed = new MessageEmbed()
        .setTitle(`ROBUX PRICE WITH CREDITS`)
        .addField(`يمكنك شراء روبوكس عدد`, '```'+ parseInt(amount) +'```')
        .addField(`عدد الكريدت بالضريبه`, '```'+ parseInt(probottxa) + '```')
        .setTimestamp();
        
        message.channel.send({embeds: [embed]}); 
    }
}