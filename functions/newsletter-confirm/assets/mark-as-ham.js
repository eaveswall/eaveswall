const fetch = require("node-fetch")

const NETLIFY_API = "https://api.netlify.com/api/v1"
const ENDPOINT = "submissions"
const SITE_ID = "70eff51a-27a3-427a-9de5-5adb5fce93cf"
const FORM_ID = "5eb03b64ed85550007242fba"
const SITE = `${NETLIFY_API}/sites/${SITE_ID}`
const FORM = `${SITE}/forms/${FORM_ID}`

const hamSubmissionState = async id => {
  const path = `${FORM}/${ENDPOINT}/${id}/ham?access_token=${process.env.APP_ACCESS_TOKEN}`
  const res = await fetch(path, {
    method: "PUT",
    body: "ham",
  })
  console.log("mark-as-spam: function resolved to ", res)
  return res
}

module.exports = hamSubmissionState
