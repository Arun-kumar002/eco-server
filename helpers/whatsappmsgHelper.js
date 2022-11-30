// const whatappSent=()=>{
//     const accountSid = 'AC24b0a5a7b76ef1429523c2dae42f3905';
// const authToken = 'af238ee06ac10e879b19ae4f9c93953d'
// const client = require('twilio')(accountSid, authToken);

// client.messages
//       .create({
//          from: '+18153966237',
//          body: 'Hello there! i am arun',
//          to: '+918610159926'
//        })
//       .then(message => console.log(message.sid)).catch(err=>{
//         console.log(err);
//       })
// }
// module.exports = { whatappSent };


//!
// const { Client } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const client = new Client();
// client.on("qr", (qr) => {
//   console.log("hi");
//   qrcode.generate(qr, { small: true });
//   // Generate and scan this code with your phone
// });

// client.on("ready", () => {
//   console.log("hi");
//   console.log("Client is ready!");
// });

// client.on("message", (msg) => {
//   console.log("hi");
//   if (msg.body == "!ping") {
//     msg.reply("pong")
//   }
//   console.log("hi");
// });

// client.initialize();