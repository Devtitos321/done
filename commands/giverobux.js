const noblox = require ('noblox.js');
const {MessageEmbed} = require('discord.js');
const sdb = require('../dataBaseModels/system.js');
const {owners} = require('../JSON/config.json');
module.exports = {
    name: 'giverobux',
    aliases: ['gr'],
async execute (client, message, args){

    if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

    let usage = new MessageEmbed().setColor('BLUE').setDescription(`**!giverobux (userName) (amount)**`)
    if(!args[0]) return message.channel.send({embeds: [usage]})
    if(isNaN(args[1])) return message.channel.send({embeds: [usage]})
    const data =  await sdb.findOne({
        guildid: message.guild.id,
    })
    if(!data) return message.channel.send("لم يتم تسجيل معلومات الداتا بعد");
    let logs = client.channels.cache.get(data.logschannel);
    

    await noblox.setCookie(data.groupCookie);
    await noblox.getGroup(parseInt(data.groupid)).then(async () => {
    noblox.getIdFromUsername(args[0].toString()).then(async (username) => {
    let funds = await noblox.getGroupFunds(parseInt(data.groupid))
    if(args[1] > funds) return message.channel.send('لا تتوفر هذه الكميه في الجروب')
    await noblox.groupPayout(parseInt(data.groupid), parseInt(username), parseInt(args[1])).then(async() => {
    let embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${message.author.tag} give ${args[0]} ${args[1]}ROBUX`)
    .addField(`gift from`, `${message.author}`)
    .addField(`gift to`, `${args[0]}`)
    .addField(`amount of robux`, `${args[1]}`)
    message.channel.send({embeds: [embed]})
    logs.send(`قام <@${message.author.id}> بتحويل ${args[1]} ألي ${args[0]}`)


        

    }).catch(error => message.channel.send("**هذا اللاعب جديد في الجروب انتظر اسبوعيين**"))

    }).catch(error => message.channel.send("**i cant find this player**"))

    }).catch(error => message.channel.send('invaild group id'))

     



 }
}