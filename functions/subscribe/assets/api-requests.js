const fetch = require("node-fetch")

const TOKEN = process.env.APP_ACCESS_TOKEN
const NETLIFY_API = "https://api.netlify.com/api/v1"
const ENDPOINT = "submissions"
const SITE_ID = "70eff51a-27a3-427a-9de5-5adb5fce93cf"
const FORM_ID = "5eb03b64ed85550007242fba"
const SITE = `${NETLIFY_API}/sites/${SITE_ID}`
const FORM = `${SITE}/forms/${FORM_ID}`

const getSubmissions = async (spam = false) => {
  const state = spam ? "state=spam&" : ""
  const res = await fetch(`${FORM}/${ENDPOINT}?${state}access_token=${TOKEN}`, {
    method: "GET",
  })
  return await res.json()
}

const spamSubmissionState = async id => {
  const path = `${NETLIFY_API}/${ENDPOINT}/${id}/spam?access_token=${TOKEN}`
  const res = await fetch(path, {
    method: "PUT",
    referrer: "",
    body: "spam=1",
  })
  return res
}

const getSubmissionFromCustomId = async customId => {
  const submissions = await getSubmissions()
  return submissions.filter(({data: {id}}) => id === customId)[0]
}

const emailExists = async email => {
  const submissions = await getSubmissions()
  return submissions.some(({data: {email: value}}) => value === email)
}

const existsInSpam = async id => {
  const spamSubmissions = await getSubmissions(true)
  return spamSubmissions.some(spamSubmission => spamSubmission.id === id)
}

exports.existsInSpam = existsInSpam
exports.emailExists = emailExists
exports.getSubmissionFromCustomId = getSubmissionFromCustomId
exports.spamSubmissionState = spamSubmissionState
