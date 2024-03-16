const router = require('express').Router()
const postApiHandler = require('../Post')
const {createUser,getUser,getUsers,updateUser,deleteUser, getUserTimeline} = require('./users')

router.use('/:userId/post', postApiHandler)
router.post('/', createUser)
router.get('/:id', getUser)
router.get('/:id/timeline', getUserTimeline)
router.get('/', getUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router
