const router = require('express').Router()
const userApiHandler = require('./users')

router.use('/users', userApiHandler)

module.exports = router