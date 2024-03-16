const { Op } = require('sequelize')
const models = require('../../models')

async function createComments(req, res, next) {
  try {
    const { userId, postId } = req.params

    const data = req.body
    const foundPost = await models.Post.findOne({
      where: {
        [Op.and]: [{ userID: userId }, { id: postId }],
      },
    })
    if (foundPost) {
      const createdComment = await models.comments.create({
        ...data,
        postId: req.params.postId,
      })
      foundPost.numberOfComments += 1
      await foundPost.save()
      models.comments.userId = data.userId
      res.json({
        success: true,
        createdComment,
      })
    } else {
      res.json({
        success: false,
        error: 'post does not belong to the current user',
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// async function getcomments(req, res, next) {
//     try {
//         const commentUser = await models.comments.findOne({
//             where:{id: req.params.id},
//             include: [
//                 {
//                     model: models.User
//                 }
//             ]
//         })
//         if(req.params.postId == commentUser.postID)
//         res.json({
//             success: true,
//             commentUser
//         })
//         else
//         res.json({
//             success: false,
//             error: "post does not belong to the current user"
//         })
//     } catch (error) {
//         console.log(error, "this is a new error.")
//         next(error)
//     }
// }

async function getAllComments(req, res, next) {
  try {
    const { postId } = req.params
    const allComments = await models.comments.findAll({
      where: { postId },
      order: [['id', 'ASC']],
    })
    res.json({
      success: true,
      allComments,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function getParComments(req, res, next) {
  try {
    const { postId, id } = req.params
    const allComments = await models.comments.findAll({
      where: { postId, parentId: id },
      order: [['id', 'ASC']],
    })
    if (!allComments) {
      res.json({
        success: false,
        message: 'There is no such post with the provided attributes.',
      })
    } else {
      res.json({
        success: true,
        allComments,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function editComment(req, res, next) {
  try {
    // check the user
    // if same user wants to edit, then update
    // if not, editing comments from other users not allowed.
    const data = req.body
    const [editedComment] = await models.comments.update(data, {
      where: { id: req.params.id },
    })
    if (!editedComment) {
      console.log(editedComment)
      res.json({
        success: false,
        message: 'ID not found.',
      })
    } else if (models.comments.userId === data.userId)
      res.json({
        success: true,
      })
    else
      res.json({
        sucess: false,
        message: 'Editing comments from other users is not valid.',
      })
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

async function deleteComment(req, res, next) {
  try {
    const deletedComment = await models.comments.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (deletedComment) {
      res.json({
        success: true,
        deletedComment,
      })
    } else
      res.json({
        success: false,
        message: 'ID not found.',
      })
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

module.exports = {
  createComments,
  getAllComments,
  editComment,
  deleteComment,
  getParComments,
}
