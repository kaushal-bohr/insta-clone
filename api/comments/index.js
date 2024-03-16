const router = require('express').Router({mergeParams: true})
const {createComments, getAllComments, editComment, deleteComment, getParComments} = require('./comments')


router.post('/', createComments)
router.get('/', getAllComments)
router.get('/:id', getParComments)
router.put('/:id', editComment)
router.delete('/:id', deleteComment)

module.exports = router