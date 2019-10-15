
const axios = require('axios').default;
const Discord = require('discord.js');

const bot= new Discord.Client();

const {info ,count, error} = require('console')
const {MessageEmbed} = require('discord.js')
const NewObg = new Object()
const GroupId = "00000001"
const Url = require('url')
const Http = require('http')
const fs = require('fs')

const express = require('express')
const app = express();
const port = 8000
 
app.get('/' , (req,res) => res.send('Working!'))
app.listen( port , () => 
  console.log(`Your app is listening a http://localhost:${port}`)
);

bot.on('ready', () => {
console.log('Run!'); 
});


bot.on('message', async message => {
  var res = await axios.get("https://covid19.ddc.moph.go.th/api/Cases/today-cases-all")
  var redzone = await axios.get("https://pastebin.com/raw/ZT82jS6B")
  var resvac = await axios.get("https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/national-vaccination-timeseries.json")
  // console.log(res.data)
  if (message.content === '!covid') {
   var Reply_Message = ` 
🏥 ข้อมูลโควิดของประเทศไทยวันที่ ${res.data[0]["update_date"]}
😷 ผู้ติดเชื้อวันนี้ ${new Intl.NumberFormat().format(Number(res.data[0]["new_case"]))} คน
😷 ติดเชื้อรวม ${new Intl.NumberFormat().format(Number(res.data[0]["total_case"]))} คน
😵 เสียชีวิตวันนี้ ${new Intl.NumberFormat().format(Number(res.data[0]["new_death"]))} คน
😵 เสียชีวิตรวม ${new Intl.NumberFormat().format(Number(res.data[0]["total_death"]))} คน
💪 รักษาหายวันนี้ ${new Intl.NumberFormat().format(Number(res.data[0]["new_recovered"]))} คน
💪 รักษาหายรวม ${new Intl.NumberFormat().format(Number(res.data[0]["total_recovered"]))} คน

`

    message.reply(`${Reply_Message}`)
     
  } 
  else if(message.content === '!area') message.reply(`
  🔴 หากต้องการทราบพื้นที่ควบคุม !normal ⬅️
  🔴 หากต้องการทราบพื้นที่เฝ้าระวังสูง !watch ⬅️
  🔴 พื้นที่นำร่องท่องเที่ยว  !travel  ⬅️` )
  
else if (message.content === '!normal'){
    
    var Reply_SParea = `
📅 ${redzone.data["update_date"]}

พื้นที่ควบคุม
${redzone.data["พื้นที่ควบคุม"]}

 `   
message.reply(`${Reply_SParea}`);
  }

else if (message.content === '!watch'){
    var Reply_SNwatch = `
📅 ${redzone.data["update_date"]}

พื้นที่เฝ้าระวังสูง
${redzone.data["พื้นที่เฝ้าระวังสูง"]}
    `
message.reply(`${Reply_SNwatch}`);

}

else if (message.content === '!travel'){
    var Reply_Ntravel = `
📅${redzone.data["update_date"]}

พื้นที่นำร่องท่องเที่ยว
${redzone.data["พื้นที่นำร่องท่องเที่ยว"]}
    `

message.reply(`${Reply_Ntravel}`);    

}

  
  else if (message.content === '!proflie'){
    
    var Reply_Message3 = `
จัดทําโดย นาย ณภพ คุ้มชาวนา
บอทตัวนี้เป็นการฝึกเขียนด้วยภาษา NodeJS
เป็นบอทที่สามารถอัพเดตสถานการณ์โควิดได้
ไม่ว่าจะยอดผู้ติดเชื้อ,ยอดการฉีดวัคซีน,พื้นที่ควบคุม
หากผิดพลาดประการใดก็ขออภัยมา ณ ที่นี้ด้วย 
# ลองเขียนครั้งแรก 🙏🙏 `

message.reply(`${Reply_Message3}`);
  }

else if  (message.content === '!help'){
    message.reply(`
☣️ คุณสามารถใช้คําสั่ง !covid     เพื่อที่จะทราบข้อมูลสถานการณ์โควิดในปัจจุบันได้
🏢 คุณสามารถใช้คําสั่ง !area       เพื่อดูพื้นที่ควบคุมได้ 
💉 คุณสามารถใช้คําสั่ง !vaccine เพื่อทราบความคืบหน้าของการฉีดวัคซีนในประเทสได้
☎ คุณสามารถใช้คําสั้ง !tel          เพื่อทราบเบอร์สายด่วนในช่วงสถานการณ์ COVID-19
👓 คุณสามารถใช้คําสั่ง !proflie   เพื่อทราบเกี่ยวกับบอท`);
  
  }

else if (message.content === '!vaccine'){
    var Reply_V = `
💉 ความคืบหน้าการฉีดวัคซีนวันที่ ${resvac.data[resvac.data.length-1]["date"]}
💊 จำนวน ${new Intl.NumberFormat().format(Number(resvac.data[resvac.data.length-1]["daily_vaccinations"]))} โดส
💊 โดสแรก ${new Intl.NumberFormat().format(Number(resvac.data[resvac.data.length-1]["first_dose"]))} โดส
💊 โดสสอง ${new Intl.NumberFormat().format(Number(resvac.data[resvac.data.length-1]["second_dose"]))} โดส
💊 โดสสาม ${new Intl.NumberFormat().format(Number(resvac.data[resvac.data.length-1]["third_dose"]))} โดส
👨  รวม ${new Intl.NumberFormat().format(Number(resvac.data[resvac.data.length-1]["total_doses"]))} โดส
 
    `
    message.reply(`${Reply_V}`)
}
else if (message.content === '!tel'){
    message.reply ('https://www.exat.co.th/wp-content/uploads/2020/11/tol-covid.jpg')
}


});


bot.login(process.env.API_KEY);

