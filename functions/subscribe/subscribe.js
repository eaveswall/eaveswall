const ejs = require("ejs")
const querystring = require("querystring")
const fetch = require("node-fetch")
const sendMail = require("./assets/send-mail")
const {
  spamSubmissionState,
  existsInSpam,
  emailExists,
  getSubmissionFromCustomId,
} = require("./assets/api-requests")

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

const sendVerification = (id, fid, email) => {
  const confirmLink = `${BASE_URL}/${FUNCTIONS_ENDPOINT}/newsletter-confirm?id=${id}&fid=${fid}`
  const messageFile = require.resolve(NEWSLETTER_CONFIRM_MSG)

  existsInSpam(id).then(yes => {
    console.log("Exists in spam: ", yes)
    if (yes) {
      ejs.renderFile(messageFile, { data: { confirmLink } }).then(message => {
        sendMail({
          from: "Eaveswall Team <team@eaveswall.com>",
          to: email,
          subject: "Newsletter Confirmation",
          html: message,
        })
          .then(info => {
            console.log("Confirmation email sent successfully", info)
          })
          .catch(err => console.log("Failed to send email", err))
      })
    }
  })
}

const netlifySubmit = async data => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(data),
  })
  return res
}

const handleNewsletter = (payload, callback) => {
  const [email, id, form_name] = [
    payload.email,
    generateId(),
    payload["form-name"],
  ]

  emailExists(email)
    .then(yes => {
      if (yes) {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: "Subscription already exists." }),
        })
      }

      netlifySubmit({ "form-name": form_name, email, id })
        .then(data => {
          console.log("Form submitted", data)
          getSubmissionFromCustomId(id).then(submission => {
            spamSubmissionState(submission.id)
              .then(status => {
                console.log("Submission added to spam ", status)
                sendVerification(submission.id, submission.form_id, email)
              })
              .catch(err =>
                console.log("Error setting submission as spam", err)
              )
          })
        })
        .catch(e =>
          callback(e, {
            statusCode: "502",
            body: "Bad Gateway",
          })
        )
    })
    .catch(e =>
      callback(e, {
        statusCode: "502",
        body: "Bad Gateway",
      })
    )
}

exports.handler = (event, _c, callback) => {
  console.log(event)
  const payload = querystring.parse(event.body)
  if (payload["form-name"] === NEWSLETTER || event.httpMethod === POST) {
    handleNewsletter(payload, callback)
  }
}
