const fetch = require("node-fetch")

const TOKEN = process.env.APP_ACCESS_TOKEN
const NETLIFY_API = "https://api.netlify.com/api/v1"
const ENDPOINT = "submissions"
const SITE_ID = "70eff51a-27a3-427a-9de5-5adb5fce93cf"
const FORM_ID = "5eb03b64ed85550007242fba"
const SITE = `${NETLIFY_API}/sites/${SITE_ID}`
const FORM = `${SITE}/forms/${FORM_ID}`

const hamSubmissionState = async id => {
  const path = `${NETLIFY_API}/${ENDPOINT}/${id}/ham?access_token=${TOKEN}`
  const res = await fetch(path, {
    method: "PUT",
    referrer: "",
    body: "ham",
  })
  return await res.json()
}

module.exports = hamSubmissionState
