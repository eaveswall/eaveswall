const hamSubmissionState = require("./assets/mark-as-ham")

const FORM_ID = "5eb03b64ed85550007242fba"

exports.handler = (event, _ctx, callback) => {
  const { id, fid } = event.queryStringParameters
  console.log(id, fid)
  if (fid !== FORM_ID) {
    callback("Error data mismatch")
  }

  hamSubmissionState(id).then((status) => {
    console.log("STATUS: ", status)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({success: true}),
    })
  }).catch(err => {
    console.log("Error setting submission as spam: ", err)
    callback(true)
  })
}
