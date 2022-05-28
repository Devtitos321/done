const noblox = require('noblox.js');
const {MessageEmbed} = require('discord.js');
const sdb = require('../dataBaseModels/system.js');
const {owners} = require('../JSON/config.json')

module.exports= {
    name: 'system',
    async execute(client, message, args){

      if(!owners.includes(message.author.id)) return message.channel.send(`**Only Owners Can use this command**`);

const system = await sdb.findOne({
    guild: message.guild.id,
})   

const systemhelp = new MessageEmbed()
.setTitle("System Settings")
.addField("لتغيير اسم البوت","```!system username```")
.addField("لتغيير صورة البوت","```!system avatar```")
.addField("عرض المعلومات المسجلة","```!system info```")
.addField("تسجيل الدخول للجروب عن طريق الكوكيز","```!system login```")
.addField("تسجيل ايدي الجروب","```!system group```")
.addField("سعر الروبكس","```!system price```")
.addField("خصم البوست","```!system boost```")
.addField("روم الشكر","```!system thanks```")
.addField("روم الادله","```!system guide```")
.addField("مستلم الكريديت", "```!system owner```")
.addField("رول البوست", "```!system boostrole```")
.addField("رول العميل", "```!system clientrole```")
.addField("الحد الادنى للشراء والتحويل","```!system limitrobux```")
.addField("اعاده الاعدادات للاعدادات الاساسية","```!system reset```")
 
 if(!args[0]) {
   
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.channel.send(systemhelp)
   }
 else {
                message.channel.send({embeds: [systemhelp]})
 }
 };
 
 if(args[0] === "info") {
   if(!system) return message.channel.send("لم يتم تسجيل أي معلومات")
 
   const infosystemmessage = new MessageEmbed()
   .setColor('black')
   .setTitle("معلومات السستم المسجلة")
   .addField("الكوكيز","```لا يمكن عرضه لاسباب امنية```")
   .addField("ايدي الجروب",`\`\`\`${system.groupid}\`\`\``)
   .addField("سعر الروبكس",`\`\`\`${system.robuxprice}\`\`\``)
   .addField("خصم البوستات",`\`\`\`${system.boostoff}%\`\`\``)
   .addField("الحد الادنى للشراء والتحويل",`\`\`\`${system.limitrobux}\`\`\``)
   .addField("روم الشكر",`<#${system.thanksroom}>`)
   .addField("روم الادلة",`<#${system.guideroom}>`)
   .addField("مستلم الارباح",`<@${system.owner}>`)
   .addField("رول البوست",`<#${system.boostrole}>`)
   .addField("رول العميل",`<#${system.clientrole}>`)
                message.channel.send({embeds: [infosystemmessage]})
 
 };
 
 if(args[0] === "login") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: args[1],
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل الكوكيز بنجاح**")
   }
 else {
   sdb.updateOne({
     groupCookie: args[1]
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل الكوكيز بنجاح**")
 }
 };
 
 
 
 
 
 if(args[0] === "group") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: args[1],
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل الجروب بنجاح**")
   }
 else {
   sdb.updateOne({
     groupid: args[1]
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل الجروب بنجاح**")
 }
 };
 
 
 
 
 
 
 if(args[0] === "price") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: args[1],
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل سعر الروبكس بنجاح**")
   }
 else {
   sdb.updateOne({
     robuxprice: args[1]
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل سعر الروبكس بنجاح**")
 }
 }
 
 
 
 
 
 
 if(args[0] === "boost") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: args[1],
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل خصم البوستات بنجاح بنجاح**")
   }
 else {
   sdb.updateOne({
     boostoff: args[1]
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل خصم البوستات بنجاح**")
 }
 };
 
 
 
 
 
 
 if(args[0] === "thanks") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: args[1].replace(/[<#>]/g, ''),
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل ايدي روم الشكر بنجاح**")
   }
 else {
   sdb.updateOne({
     thanksroom: args[1].replace(/[<#>]/g, '')
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل ايدي روم الشكر بنجاح**")
 }
 };
 
 
 
 if(args[0] === "guide") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: args[1].replace(/[<#>]/g, ''),
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل ايدي روم الادله بنجاح**")
   }
 else {
   sdb.updateOne({
     guideroom: args[1].replace(/[<#>]/g, '')
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل ايدي روم الادله بنجاح**")
 }
 };
 
 
 
 
 if(args[0] === "owner") {
   let mention = true
 let member = message.mentions.users.first()
 if(!member) {
let member1 = await message.guild.members.cache.get(args[1])
if(!member1) return message.lineReply("**:rolling_eyes: -  لا يمكنني العثور على هذا العضو**"); 
   mention = false
member = member1
}  else {
 member =  message.guild.members.cache.get(message.mentions.users.first().id)
}
if(member){
mention = true
}
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: member.id,
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل ايدي مستلم الارباح بنجاح**")
   }
 else {
   sdb.updateOne({
     owner: member.id
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل ايدي مستلم الارباح بنجاح**")
 }
 };
 
 
 
 
 
 if(args[0] === "boostrole") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: args[1].replace(/[<@!>]/g, ''),
 clientrole: "none",
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل ايدي رول البوست بنجاح**")
   }
 else {
   sdb.updateOne({
     boostrole: args[1].replace(/[<@!>]/g, '')
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل ايدي رول البوست بنجاح**")
 }
 };
 
 
 
 if(args[0] === "clientrole") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: args[1].replace(/[<@!>]/g, ''),
 limitrobux: "none",
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل ايدي رول العميل بنجاح**")
   }
 else {
   sdb.updateOne({
     clientrole: args[1].replace(/[<@!>]/g, '')
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل ايدي رول العميل بنجاح**")
 }
 };
 
 
 
 
 if(args[0] === "limitrobux") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: args[1],
 logschannel: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم تسجيل الحد الادنى للشراء والتحويل بنجاح**")
   }
 else {
   sdb.updateOne({
     limitrobux: args[1].replace(/[<#>]/g, '')
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم تسجيل الحد الادنى للشراء والتحويل بنجاح**")
 }
 };

 if(args[0] === "logschannel"){
   if(!system){
     const dataaa = new sdb({
      guildid: message.channel.guild.id,
      groupCookie: "none",
      groupid: "none",
      robuxprice: 1000,
      boostoff: 0,
      thanksroom: "none",
      guideroom: "none",
      owner: "none",
      boostrole: "none",
      clientrole: "none",
      limitrobux: "none",
      logschannel: args[1].replace(/[<#>]/g, ''),
     })
     dataaa.save()
     message.channel.send("DONE")
   }else{
    sdb.updateOne({
      logschannel: args[1].replace(/[<#>]/g, ''),
    })
    .then(result => {console.log('done')})
    message.channel.send('تم تحديد روم لوج بنجاح')
   }
 }

 
 
 if(args[0] === "reset") {
   if(!system) {
   const dataa = new sdb({
 guildid: message.channel.guild.id,
 groupCookie: "none",
 groupid: "none",
 robuxprice: 1000,
 boostoff: 0,
 thanksroom: "none",
 guideroom: "none",
 owner: "none",
 boostrole: "none",
 clientrole: "none",
 limitrobux: "none",
})
   dataa.save()
   .then(result => console.log(result))
   .catch(err => console.log(err));
   message.delete()
   message.channel.send("**تم الاعادة الى الاعدادات الاساسية بنجاح بنجاح**")
   }
 else {
   sdb.findOneAndDelete({
     guildid: message.channel.guild.id
   })
   .then(result => console.log(result))
   .catch(err => console.log(err));
                message.channel.send("**تم الاعادة الى الاعدادات الاساسية بنجاح بنجاح**")
 }
 };
    




 








  }
 }