const ejs = require("ejs")
const querystring = require("querystring")
const fetch = require("node-fetch")
const base64Img = require("image-to-base64")
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
const NEWSLETTER_CONFIRM_MSG = require.resolve(
  "./assets/confirm-newsletter.ejs"
)
const MAIL_ICON = require.resolve("./assets/mail_x128.png")
const EAVESWALL_TEXT = require.resolve("./assets/eaveswall-text_x192.png")

const generateId = () => {
  return require("uuid").v4()
}

const toImageStr = (value, type) => {
  return `data:image/${type};base64, ${value}`
}

const encode = data => {
  return Object.keys(data)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    })
    .join("&")
}

const netlifySubmit = async data => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(data),
  })
  return res
}

async function sendVerification(id, fid, email) {
  const confirmLink = `${BASE_URL}/${FUNCTIONS_ENDPOINT}/newsletter-confirm?id=${id}&fid=${fid}`

  const mailIcon = toImageStr(await base64Img(MAIL_ICON), "png")
  const wallText = toImageStr(await base64Img(EAVESWALL_TEXT), "png")

  const inSpam = await existsInSpam(id)

  if (inSpam) {
    console.log(`The email "${email}" already exists in spam`)

    const message = await ejs.renderFile(NEWSLETTER_CONFIRM_MSG, {
      data: { confirmLink, mailIcon, wallText },
    })

    const info = await sendMail({
      from: "Eaveswall Team <team@eaveswall.com>",
      to: email,
      subject: "Newsletter Confirmation",
      html: message,
    })
    // console.log("Confirmation email sent successfully: ", info)
    return info
  }
  throw new Error(
    `Email doesn't seem to exist in an unverified state. "${email}" probably exists in our mailing list`
  )
}

async function handleNewsletter(payload) {
  const [email, id, form_name] = [
    payload.email,
    generateId(),
    payload["form-name"],
  ]

  // check if the email aready exists in a verified state
  const isVerified = await emailExists(email)

  if (isVerified) {
    return {
      info: "pre-verified",
      mailInfo: null,
      message: `Subscription for "${email}" already exists.`,
    }
  }

  // submit to netlify if it doesn't exist as verified
  const netlifyResponse = await netlifySubmit({
    "form-name": form_name,
    email,
    id,
  })

  console.log("Form submitted: ", netlifyResponse)

  // get the netlify generated id for the submitted form
  const submission = await getSubmissionFromCustomId(id)

  console.log("Submission retrieved")

  const spamRespone = await spamSubmissionState(submission.id)

  console.log("Submission added to spam: ", spamRespone)

  // send newsletter confirmation email
  const mailInfo = await sendVerification(
    submission.id,
    submission.form_id,
    email
  )
  return {
    info: "completed",
    mailInfo,
    message: `Subscribed sucessfully. A confirmation email has been sent to "${email}"`,
  }
}

process.on("unhandledRejection", err => {
  throw err
})

exports.handler = (event, _ctx, callback) => {
  // console.log(event)
  const payload = querystring.parse(event.body)
  if (payload["form-name"] === NEWSLETTER || event.httpMethod === POST) {
    handleNewsletter(payload)
      .then(({ info, mailInfo, message }) => {
        if (info === "pre-verified") {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message }),
          })
        } else {
          console.log(mailInfo)
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              message,
            }),
          })
        }
      })
      .catch(err => {
        console.log("AN ERROR OCCURED! ☹: ", err.message || err)
        callback(err, {
          statusCode: "502",
          body: JSON.stringify({
            message:
              "An error occured, could not complete processing your request",
            error: err.message,
          }),
        })
      })
  }
}
