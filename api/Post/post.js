const models = require('../../models')

async function createPost(req, res, next) {
  try {
    const data = req.body
    const createdPost = await models.Post.create({
      ...data,
      userID: req.params.userId,
    })
    res.json({
      success: true,
      createdPost,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function getPost(req, res, next) {
  try {
    const postUser = await models.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.User,
        },
      ],
    })
    if (req.params.userId === postUser.userID) {
      const count1 = await models.likes.count({
        where: { postID: req.params.id },
      })
      postUser.numberOfLikes = count1
      const count2 = await models.comments.count({
        where: { postId: req.params.id },
      })
      postUser.numberOfComments = count2
      await postUser.save()
      res.json({
        success: true,
        postUser,
      })
    } else
      res.json({
        success: false,
        error: 'post does not belong to the current user',
      })
  } catch (error) {
    console.log(error, 'this is a new error.')
    next(error)
  }
}

// async function getAllPosts(req, res, next) {
//     try {
//         const postUser = await models.Post.findAll({
//             order: [['id', 'ASC']]
//             // include: [
//             //     {
//             //         model: models.User
//             //     }
//             // ]
//         })
//         if(req.params.userId == postUser.userID){
//             // console.log("this is all posts from findAll.");
//             res.json({
//                 success: true,
//                 postUser
//             })
//         }
//         else
//         res.json({
//             success: false,
//             error: "There are no posts for the current user"
//         })
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }

async function getAllPosts(req, res, next) {
  try {
    const allPosts = await models.Post.findAll({
      where: { userID: Number(req.params.userId) },
      order: [['id', 'ASC']],
    })
    // if(req.params.userId == allPosts.userID)
    res.json({
      success: true,
      allPosts,
    })
    // else
    // res.json({
    //     success: false,
    //     error: "There are no posts for the current user"
    // })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function editPost(req, res, next) {
  try {
    // check the user
    // if user exist, update
    // if not, return error
    const data = req.body
    // if (models.Post.userId !== data.userId) {
    const [editedPost] = await models.Post.update(data, {
      where: { id: req.params.id, userID: req.params.userId },
    })
    if (editedPost) {
      console.log(editedPost)
      res.json({
        success: true,
        editedPost,
      })
    } else {
      res.json({
        success: false,
        message: 'Post does not belong to the entered user id.',
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function deletePost(req, res, next) {
  try {
    const deletedPost = await models.Post.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (deletedPost) {
      res.json({
        success: true,
        deletedPost,
      })
    } else
      res.json({
        success: false,
        message: 'ID not found.',
      })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  editPost,
  deletePost,
}
