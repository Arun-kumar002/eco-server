const nodemailer = require("nodemailer");
let sendmail = (receiver, text, html, subject) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dexterak002@gmail.com",
      pass: "stdnibnvukafwxtn",
    },
  });
  let mailOption = {
    from: "dexterak002@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
    html: html,
  };
  transport.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
      return error.message;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};
sendmail("arunsubramanian002@gmail.com", "hi", "<h1>test</h1>", "test_mail");
module.exports = { sendmail };
