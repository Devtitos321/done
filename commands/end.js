const cooldown = require('pro.db');


module.exports = {
    name: 'end',
async execute (client, message, args){

    
  let have = cooldown.get(`${message.author.id}`)
  if(have == "true") {
      cooldown.delete(`${message.author.id}`);
 
       message.channel.send("تم الغاء عمليه الشراء سوف يتم خذف التكت خلاص 5 ثواني")
      setTimeout(() => {
           return message.channel.delete()
      }, 5*1000)

  }else{
      message.channel.send('ليس لديك عمليه شراء')
  }

 }
}