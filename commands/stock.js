const noblox = require('noblox.js');
const {MessageEmbed} = require('discord.js');
const data = require('../dataBaseModels/system.js');
const {owners} = require('../JSON/config.json');
module.exports = {
    name: 'stock',
async execute (client, message, args){

    if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

        let server = await data.findOne({
            guildid: message.guild.id,
        })

     
       
     

        await noblox.setCookie(server.groupCookie).then(async (user) => {
            await noblox.getGroup(server.groupid).then(async (group) => {
              let funds = await noblox.getGroupFunds(parseInt(server.groupid));
              let revenueSummary = await noblox.getGroupRevenueSummary(5210705, 'Year')
             let fullpayout = parseInt(revenueSummary.groupPayoutRobux)
        
        
        let embed = new MessageEmbed()
        .setTitle('##' + group.name)
        .setColor('BLUE')//.setDescription(`**Group Funds is** \`${funds}\` \n\ **pending funds id** \`${revenueSummary.pendingRobux}\``)
        .addField('group Funds is', `\`\`\`${funds}\`\`\``)
        .addField('penging Funds is', `\`\`\`${revenueSummary.pendingRobux}\`\`\``)
        .addField('full group payout is', `\`\`\`${fullpayout}\`\`\``)
        message.channel.send({embeds: [embed]})
       
        
          
        
  
        })
    })
        



 }
}