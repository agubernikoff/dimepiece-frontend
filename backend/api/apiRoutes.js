const app = require('express')

const router = app.Router()

const postsRoutes = require('./posts/routes')

router.use('/posts', postsRoutes)

module.exports = router
