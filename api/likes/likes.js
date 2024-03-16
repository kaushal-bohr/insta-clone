const { Op } = require('sequelize')
const models = require('../../models')

async function createlike(req, res, next) {
  try {
    const { userId, postId } = req.params
    const { userID: likedUserId } = req.body
    const foundPost = await models.Post.findOne({
      where: {
        [Op.and]: [{ userID: userId }, { id: postId }],
      },
    })
    if (foundPost) {
      const createdLike = await models.likes.create({
        postID: postId,
        userID: likedUserId,
      })
      foundPost.numberOfLikes += 1
      await foundPost.save()
      res.json({
        success: true,
        createdLike,
      })
    } else {
      res.json({
        success: false,
        error: 'Post does not exist.',
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function createUnlike(req, res, next) {
  try {
    const { userId, postId } = req.params
    const { userId: likedUserId } = req.body
    const foundPost = await models.Post.findOne({
      where: {
        [Op.and]: [{ userID: userId }, { id: postId }],
      },
    })
    if (foundPost) {
      const createdUnlike = await models.likes.create({
        postID: postId,
        userId: likedUserId,
      })
      foundPost.numberOfLikes -= 1
      await foundPost.save()
      res.json({
        success: true,
        createdUnlike,
      })
    } else {
      res.json({
        success: false,
        error: 'Post does not exist.',
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function getAllLikes(req, res, next) {
  try {
    const { postId } = req.params
    const allLikes = await models.likes.findAll({
      where: { postID: postId },
      order: [['id', 'ASC']],
    })
    res.json({
      success: true,
      allLikes,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// async function getUserLikes(req, res, next) {
//     try {
//         const {postId} = req.params
//         const allLikes = await models.likes.findAll({
//             where:{postID: postId},
//             include:[
//                 {
//                     model:models.User
//             }
//         ]
//             order: [['id', 'ASC']]

//         })
//         res.json({
//             success: true,
//             allLikes
//         })
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

module.exports = {
  createlike,
  getAllLikes,
  createUnlike,
}
