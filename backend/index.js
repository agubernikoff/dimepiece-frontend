require('dotenv').config()

const server = require('./server')

const PORT = process.env.PORT || 8080

server.listen(PORT, (error) => {
  if (!error) {
    console.log('Server is Successfully Running, and App is listening on port: ', PORT)
  } else {
    console.log("Error occurred, server can't start", error)
  }
})
