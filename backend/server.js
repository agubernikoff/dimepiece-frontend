const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
const apiRoutes = require('./api/apiRoutes')

// initializing express
const server = express()

// enabling all cors request
server.use(cors())

// to check system health
server.get('/health', (req, res) => {
  res.send('<html><body>System is up & running</body></html>')
})

// to handle api routes
server.use('/api', apiRoutes)

// 404 error handler
server.use((_req, _res, next) => {
  next(createError(404))
})

// Main error handler for express app. All errors passed to next() are caught here.
const production = true
server.use((err, _req, res, _next) => {
  const { message, stack, statusCode: errCode } = err
  const status = errCode || 500
  const errObj = {
    message,
    status,
    stack: production ? 'unavailable' : stack
  }
  res.status(status).json(errObj)
})

module.exports = server
