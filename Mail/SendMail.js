const nodemailer = require('nodemailer')


const mailTo = async(email,subject,content)=>{
    try {
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "testmailnoreply989@gmail.com",
                pass: "xglmptwkgrolrpzm",
              },
        })

        transport.sendMail({
            from:"testmailnoreply989@gmail.com",
            to:email,
            subject:subject,
            text:content
        }).then((result)=>{
            console.log("Mail sent Successfully",result)
        })

    } catch (error) {
        console.log("SendMail.js------>",error)
    }
}

module.exports=mailTo