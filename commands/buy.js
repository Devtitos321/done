const { MessageEmbed, Collection } = require('discord.js');
const sdb = require('../dataBaseModels/system.js');
const db = require('../dataBaseModels/balance.js');
const mongoose = require('mongoose');
const cooldown = require('pro.db');


module.exports = {
    name: 'buy',
async execute (client, message, args){
 
    
   if(!args[0]) return message.channel.send(`!buy [amount]`)


 const settings = await sdb.findOne({guildid: message.guild.id});
   if(!settings) return message.channel.send(`لم يتم تسجيل معلومات الداتا بعد`)

   const status = cooldown.has(`${message.author.id}`,'true');
   if(status === true) return message.channel.send('لديك عمليه شراء بالفعل');
   
   cooldown.set(`${message.author.id}`, 'true')
  
  
  





 

   let price = parseInt(settings.robuxprice);
   let priceFull = parseInt(price * Number(args[0]));
   let withtax = parseInt(priceFull * 20 / 19 + 1) ;
   let owner = settings.owner;
   let logs = client.channels.cache.get(settings.logschannel);
   probotid = '282859044593598464';
  

   

   const buy = new MessageEmbed()
   .setTitle(`Robux buy command `)
   .setDescription( ` \`\`\`#credits ${owner} ${withtax}\`\`\``)
   .setTimestamp()
    message.channel.send({embeds: [buy]})
 
    
    .then(msg => {
        


        const filter = ({ content, author: { id } }) => {

          return content.startsWith(`**:moneybag: | ${message.author.username}, has transferred `) &&content.includes(`${owner}`) && id === probotid && (Number(content.slice(content.lastIndexOf("`") - String(priceFull).length, content.lastIndexOf("`"))))
        }


 message.channel.awaitMessages({
          filter,
          max: 1,
          time: 60 * 1000 * 5,
errors: ['time']
}).then( async(msg) => {


    const have2 = cooldown.get(`${message.author.id}`);
    if(!have2) return;
  
    const balanceuser = await db.findOne({userid: message.author.id});


    if(!balanceuser) {
        const data = new db({
            _id: mongoose.Types.ObjectId(),
            userid: message.author.id,
            balance: args[0],
        })
        data.save().then(result => {console.log('done new user')})

        let embed = new MessageEmbed().setColor('BLUE').setDescription(`تمت عمليه الشراء بنجاح سوف يتم قفل التكت خلاص 20 ثانيه`);

        let embed3 = new MessageEmbed()
        .setColor('DARK_BLUE')
        .setTitle(`تم اضافه \`${args[0]}\` الي حسابك `)
        .addField(`لمعرفه رصيدك `, '```' +'!balance'+ '```')
        .addField(` لتحويل الروبوكس `, '```'+'!transfer'+ '```')
               
                logs.send(`قام ${message.author} بشراء \`${args[0]}\` `)
                setTimeout ( () => {
                    message.channel.delete()
                }, 20*1000)

                message.author.send({embeds: [embed3]})
                cooldown.delete(`${message.author.id}`)
                return message.channel.send({embeds: [embed]});
                
                
    
          

    }


     balanceuser.updateOne({
         balance: Number(balanceuser.balance) + Number(args[0])
     }).then((result) => {console.log(`done add ${args[0]} to user balance`)})


    let embed = new MessageEmbed().setColor('BLUE').setDescription(`تمت عمليه الشراء بنجاح سوف يتم قفل التكت خلاص 20 ثانيه`);

    let embed2 = new MessageEmbed()
    .setColor('DARK_BLUE')
    .setTitle(`تم اضافه \`${args[0]}\` الي حسابك `)
    .addField(`لمعرفه رصيدك `, '```' +'!balance'+ '```')
    .addField(` لتحويل الروبوكس `, '```'+'!transfer'+ '```')
            message.channel.send({embeds: [embed]});
            logs.send(`قام ${message.author} بشراء \`${args[0]}\` `)

            message.author.send({embeds: [embed2]})
              

            cooldown.delete(`${message.author.id}`)
            setTimeout ( () => {
                message.channel.delete()
            }, 20*1000)
        

 }).catch (error => {
     msg.delete().catch(error => {console.log("error")})
     cooldown.delete(`${message.author.id}`)
     message.channel.send('انتهت مهله التحويل')

 })

    })
     }
    }      