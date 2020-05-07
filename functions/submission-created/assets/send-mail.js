const nodemailer = require("nodemailer")

const sendMail = ({ from, to, subject, html = null, text = null }) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_PROVIDER,
    port: 465,
    auth: {
      user: process.env.ADMIN_MAIL_ADDR,
      pass: process.env.EMAIL_AUTH_KEY,
    },
  })

  const message = {
    from: from,
    to: to,
    subject: subject,
    html: html,
    text: text,
  }

  const feedback = new Promise((resolve, reject) => {
    transport.sendMail(message, (err, info) => {
      if (err) reject(err)
      else resolve(info)
    })
  })

  return feedback
}

module.exports = sendMail
