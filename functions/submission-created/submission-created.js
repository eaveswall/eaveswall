const ejs = require("ejs")
const sendMail = require("./assets/send-mail")
const spamSubmissionState = require("./assets/marks-as-spam")

const BASE_URL = "https://eaveswall.com"
const FUNCTIONS_ENDPOINT = ".netlify/functions"
const NEWSLETTER = "newsletter"
const NEWSLETTER_CONFIRM_MSG = "./assets/confirm-newsletter.ejs"

exports.handler = (event, _context, callback) => {
  const payload = JSON.parse(event.body).payload
  console.log(payload)

  if (payload.form_name === NEWSLETTER) {
    const [email, id, fid] = [
      payload.data.email,
      payload.id,
      payload.form_id,
    ].map(value => encodeURIComponent(value))

    console.log("email", decodeURIComponent(email))
    const confirmLink = `${BASE_URL}/${FUNCTIONS_ENDPOINT}/newsletter-confirm?em=${email}&id=${id}&fid=${fid}`
    const messageFile = require.resolve(NEWSLETTER_CONFIRM_MSG)

    ejs.renderFile(messageFile, { data: { confirmLink } }).then(message => {
      sendMail({
        from: "Eaveswall Team <team@eaveswall.com>",
        to: decodeURIComponent(email),
        subject: "Newsletter Confirmation",
        html: message,
      })
        .then(info => {
          console.log("Confirmation email sent successfully", info)
        })
        .catch(err => console.log("Failed to send email", err))
    })

    spamSubmissionState(id).catch(err => console.log("Error setting submission as spam", err))
  }
}
