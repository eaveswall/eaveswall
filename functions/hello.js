exports.handler = (event, ctx, c) => {
  c(null, {
    statusCode: 200,
    body: `${JSON.stringify(event)} "hellos world"`
  })
}

