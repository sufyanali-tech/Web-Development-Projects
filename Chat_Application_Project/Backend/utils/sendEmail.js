const nodemailer =  require("nodemailer");

async function sendResetEmail(toEmail, code) {
    
    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
        
    })

    const mailOption = {

        from: process.env.EMAIL_PASS,
        to: toEmail,
        subject: "Password Reset Code - ChatApp ",
        text: `Your password reset code  is ${code}. This code will expire in 10 minutes.`
    }

    await transporter.sendMail(mailOption);
}

module.exports = sendResetEmail;