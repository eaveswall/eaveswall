const path = require("path")
const ejs = require("ejs")
const sendMail = require("./assets/send-mail")

const BASE_URL = "https://eaveswall.com"
const NEWSLETTER = "newsletter"
const NEWSLETTER_CONFIRM_MSG = "./assets/confirm-newsletter.ejs"
const NEWSLETTER_SUCCESS =
  "Submitted successfully. We just sent you a conformation email, please check your inbox to confirm"

exports.handler = (event, _context, callback) => {
  const payload = JSON.parse(event.body).payload

  if (payload.form_name === NEWSLETTER) {
    try {
      console.log(require.resolve(NEWSLETTER_CONFIRM_MSG))
    } catch (e) {console.log("failed")}
    const [email, id, fid] = [
      payload.data.email,
      payload.id,
      payload.form_id,
    ].map(value => encodeURIComponent(value))

    const confirmLink = `${BASE_URL}/newsletter-confirm?em=${email}&id=${id}&fid=${fid}`
    const messageFile = path.resolve(NEWSLETTER_CONFIRM_MSG)

    sendMail({
      from: "Eaveswall Team <team@eaveswall.com>",
      to: decodeURIComponent(email),
      subject: "Newsletter Confirmation",
      html: ejs.renderFile(messageFile, { data: { confirmLink } }),
    }).then(({ success, info }) => {
      if (success) {
        callback(null, {
          statusCode: 200,
          body: NEWSLETTER_SUCCESS,
        })
      } else {
        callback(info)
      }
    })
  }
}
