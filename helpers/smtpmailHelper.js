const nodemailer=require('nodemailer');


const sendMail=async (to,attachments)=>{
    const transport=nodemailer.createTransport({
        auth:{
            user:'dexterak002@gmail.com',
            pass:'uexrococsdmayqmh'
        },
        host:'smtp.gmail.com',
        port:465,
        secure:true
    })

    try {
        await transport.sendMail({
          from: "dexterak002@gmail.com",
          subject: "test",
          to,
          attachments
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports={sendMail}