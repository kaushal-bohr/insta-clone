const { Op } = require('sequelize')
const models = require('../../models')

async function createUser(req, res, next) {
  try {
    const data = req.body
    const foundUser = await models.User.findOne({
      where: {
        [Op.or]: [{ username: data.username }, { email: data.email }],
      },
    })
    if (!foundUser) {
      const createdUser = await models.User.create(data)
      res.json({
        success: true,
        createdUser,
      })
    } else {
      res.json({
        success: false,
        error: 'User already exists.',
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function getUsers(req, res, next) {
  try {
    const allUsers = await models.User.findAll({
      order: [['id', 'ASC']],
    })

    res.json({
      success: true,
      allUsers,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function getUser(req, res, next) {
  try {
    const searchedUser = await models.User.findOne({
      where: { id: req.params.id },
    })
    if (searchedUser) {
      res.json({
        success: true,
        searchedUser,
      })
    } else
      res.json({
        success: false,
        message: 'data does not exist.',
      })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function getUserTimeline(req, res, next) {
  try {
    const userTimeline = await models.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.Post,
          include: [{ model: models.likes }, { model: models.comments }],
        },
      ],
      order: [['id', 'ASC']],
    })
    if (userTimeline === null) {
      res.json({
        success: true,
        message: 'The current user does not have any posts.',
      })
    } else {
      res.json({
        success: true,
        userTimeline,
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function updateUser(req, res, next) {
  try {
    // check the user
    // if user exist, update
    // if not, return error
    const data = req.body
    /*  let updatedUser = await models.User.findOne({
            where: {data

            }
        })  */
    const [updatedUsers] = await models.User.update(data, {
      where: {
        id: req.params.id,
      },
    })
    if (!updatedUsers) {
      console.log(updatedUsers)
      res.json({
        success: false,
        message: 'ID not found.',
      })
    } else
      res.json({
        success: true,
      })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function deleteUser(req, res, next) {
  try {
    const deletedUsers = await models.User.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (deletedUsers) {
      res.json({
        success: true,
        deletedUsers,
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
  createUser,
  getUser,
  getUserTimeline,
  updateUser,
  deleteUser,
  getUsers,
}
