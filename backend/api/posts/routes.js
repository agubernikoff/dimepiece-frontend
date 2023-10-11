const app = require('express')
const { getAllPosts } = require('./controller')

const router = app.Router()

router.get('/', getAllPosts)

module.exports = router
