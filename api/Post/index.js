const router = require('express').Router({mergeParams: true})
const likesApiHandler = require('../likes')
const commentsApiHandler = require('../comments')
const {createPost,getPost,getAllPosts,editPost,deletePost} = require('./post')

router.use('/:postId/likes', likesApiHandler)
router.use('/:postId/comments', commentsApiHandler)
router.post('/', createPost)
router.get('/:id', getPost)
router.get('/', getAllPosts)
router.put('/:id', editPost)
router.delete('/:id', deletePost)

module.exports = router
