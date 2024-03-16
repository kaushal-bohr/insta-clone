const router = require('express').Router({mergeParams: true})
const {createlike, getAllLikes, createUnlike} = require('./likes')


router.post('/', createlike)
router.get('/',getAllLikes)
router.delete('/',createUnlike)


module.exports = router