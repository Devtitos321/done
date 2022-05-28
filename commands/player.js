const noblox = require('noblox.js');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'player',
async execute (client, message, args){


    if(!args[0]) message.channel.send("اكتب اسم الاعب")
     
    if(args[0]){
            await noblox.getIdFromUsername(args[0]).then(async(user) => {
           let info = await noblox.getPlayerInfo({userId: user})  
           let playerAvatar = await noblox.getPlayerThumbnail(user, '720x720', 'png', false, 'Headshot')
   
           let embed = new MessageEmbed()
           .setTitle("Roblox Player Info")
           .addField('Username', `${info.username}`, true)
            .addField('Nickname', `${info.displayName}`, true)
            .addField('Friend', `${info.friendCount}`)
            .addField('Followers', `${info.followerCount}`, true)
            .addField('Following', `${info.followingCount}`, true)
            .addField('isBanned',  `${info.isBanned}`)
           .setThumbnail(playerAvatar[0].imageUrl)
          message.channel.send({embeds: [embed]})
       
   
    
            })
        } 
    
}
}