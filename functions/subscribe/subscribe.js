const ejs = require("ejs")
const querystring = require("querystring")
const sendMail = require("./assets/send-mail")
const { spamSubmissionState, existsInSpam } = require("./assets/api-requests")

const POST = "POST"
const BASE_URL = "https://eaveswall.com"
const FUNCTIONS_ENDPOINT = ".netlify/functions"
const NEWSLETTER = "newsletter"
const NEWSLETTER_CONFIRM_MSG = "./assets/confirm-newsletter.ejs"

const generateId = () => {
  const crypto = require("crypto")
  return crypto.randomBytes(16).toString("hex")
}

const encode = data => {
  return Object.keys(data)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    })
    .join("&")
}

const netlifySubmit = async data => {
  const fetch = require("node-fetch")
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(data),
  })
  return await res.json()
}

const handleNewsletter = payload => {
  const [email, id, form_name] = [
    payload.email,
    generateId(),
    payload["form-name"],
  ].map(value => encodeURIComponent(value))

  netlifySubmit({ "form-name": form_name, email, id })
    .then(data => console.log(data))
    .catch(console.error)

  // const confirmLink = `${BASE_URL}/${FUNCTIONS_ENDPOINT}/newsletter-confirm?id=${id}&fid=${fid}`
  // const messageFile = require.resolve(NEWSLETTER_CONFIRM_MSG)

  // existsInSpam(id).then(yes => {
  //   console.log("exists in spam: ", yes)
  //   if (!yes) {
  //     ejs.renderFile(messageFile, { data: { confirmLink } }).then(message => {
  //       sendMail({
  //         from: "Eaveswall Team <team@eaveswall.com>",
  //         to: decodeURIComponent(email),
  //         subject: "Newsletter Confirmation",
  //         html: message,
  //       })
  //         .then(info => {
  //           console.log("Confirmation email sent successfully", info)
  //         })
  //         .catch(err => console.log("Failed to send email", err))
  //     })

  //     spamSubmissionState(id)
  //       .then(status => console.log("Submission added to spam ", status))
  //       .catch(err => console.log("Error setting submission as spam", err))
  //   }
  // })
}

exports.handler = event => {
  console.log(event)
  const payload = querystring.parse(event.body)
  if (payload["form-name"] === NEWSLETTER || event.httpMethod === POST) {
    handleNewsletter(payload)
  }
}
