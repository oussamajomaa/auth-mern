import nodemailer from 'nodemailer'

const mail = (to,subject,html) => {
    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        })
    transporter.sendMail({from: process.env.EMAIL_USER, to, subject, html
    })
}

export default mail