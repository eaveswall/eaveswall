exports.handler = (event, ctx, callback) => {
  // const payload = JSON.parse(event)
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: "event",
  })
}
