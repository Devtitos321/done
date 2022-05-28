const { MessageEmbed, MessageAttachment, Collection } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const noblox = require('noblox.js');
const sdb = require('../dataBaseModels/system.js');
const db = require('../dataBaseModels/balance.js');



module.exports = {
  name: 'transfer',
  usages: ['transfer (Username) (Amount)'],
async execute (client, message, args){


  const help = new MessageEmbed()
  .setColor('#ec1c24')
  .setTitle(`**الرجاء كتابة عدد الروبكس المراد تحويله بعد الامر**`)
  .setDescription("**!transfer [name] [robux]**");
   
  if(!args[1] || args[0]) return message.channel.send({embeds: [help]});
 
  if(isNaN(args[1])) return message.channel.send({embeds: [help]});



       const server = await sdb.findOne({guildid: message.guild.id}); //find server
       if(!server) return message.channel.send("التحويل مقفل حاليا")
       const user = await db.findOne({userid: message.author.id}); //find user from database
       await noblox.getIdFromUsername(args[0].toString()).then(async function(player) { //find player from Roblox
       await noblox.setCookie(server.groupCookie).then(async function() { // setCookie 
      await noblox.getGroup(server.groupid).then(async (group) => { // setGroup

        let clientGroups = [];

        await noblox.getGroups(player).then(async (groups) => {
        groups.forEach(async (group) => clientGroups.push(group.Id.toString()));
        if (!clientGroups.includes(server.groupid)) return message.channel.send(`هذا اللاعب غير متوجد في الجروب \n\ https://www.roblox.com/groups/${server.groupid} \n\ قم بدخول الجروب وانتظر اسبوعيين لاعاده الشحن`);
        
        let funds = await noblox.getGroupFunds(parseInt(server.groupid))
        
       if(args[1] > funds) return message.channel.send('هذا العدد من الروبوكس غير متاح حاليا');
        
        if(!user) return message.channel.send('ليس لديك رصيد لاتمام هذه العمليه');
        
        if(user.balance < args[1]) return message.channel.send('ليس لديك رصيد لاتمام هذه العمليه');

        await noblox.groupPayout(Number(server.groupid), Number(player), Number(args[1])).then( async function() {
        
        user.updateOne({balance: Number(user.balance) - Number(args[1])}).then(result => {console.log(result)})

        
       const proof = client.channels.cache.get(server.guideroom);
       const thanksroom = client.channels.cache.get(server.thanksroom);
       const logs = client.channels.cache.get(server.logschannel);

       const done1 = new MessageEmbed()
       .setColor('black')
       .setTitle(`**تم تحويل الرصيد لحساب \`${args[0]}\` بنجاح \`${Number(args[1])}R\` ،**`)
       .setDescription(`**رصيد حسابك الحالي هو \`${user.balance - Number(args[1])}R\`**\n**الرجاء كتابة كلمة شكر في روم <#${server.thanksroom}>**`);

       message.channel.send({embeds: [done1]});
        logs.send(`تم تحويل ${args[1]} ألي ${args[0]}`)

if(!proof) return;

  let th = await noblox.getPlayerThumbnail(parseInt(player), 420, "jpeg", true, 'Headshot').then(async(a) => {
    let url = "";
    let bla = await noblox.getGroupFunds(parseInt(server.groupid));
    let tranrobux = args[1]
    bla = bla.toLocaleString();
  a.forEach(avatar => url = avatar.imageUrl);

  



const canvas = createCanvas(991, 172);
  const ctx = canvas.getContext('2d')
  const background = await loadImage('https://cdn.discordapp.com/attachments/838151432040874075/838528172394938420/PicsArt_05-03-12.31.17.jpg');
    ctx.beginPath();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = '15px impact';
    ctx.fillStyle = 'black';
    ctx.fillText(tranrobux.toLocaleString().toString(), 802.5, 42.4);
    ctx.font = "650 16px impact";
    ctx.fillText(tranrobux.toLocaleString().toString(), 864.5, 82.5);
    ctx.fillText(bla.toString(), 830.5, 105.7);
    ctx.font = "570 15.2px impact";
    ctx.fillText(args[0], 61, 35);
    ctx.closePath();
    const userImage = await loadImage(url.toString());
   ctx.drawImage(userImage, 11.5,16.5,35,35);
    ctx.beginPath();
    ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const attach = new MessageAttachment(canvas.toBuffer(), 'payout.png');
    proof.send(`تم الشراء بواسطة : <@${message.author.id}>`, attach);

  
     
  
        }).catch(e => console.log(e));
      
         }).catch(err => {
           message.channel.send('انت جديد في الجروب انتظر اسبوعيين ثم حاول التحويل مجددا')
         })
      

        }).catch(err => console.log(err))

        }).catch(err => message.channel.send("التحويل مقفل حاليا"))

       }).catch(err => message.channel.send("التحويل مقفل حاليا"))

       }).catch(err =>{
         message.channel.send("لم اعثر علي هذا اللاعب");
       })
  }
}


