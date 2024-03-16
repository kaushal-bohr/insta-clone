'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.User, {foreignKey: "userID"})
      post.hasMany(models.likes, {foreignKey: "postID"})
      post.hasMany(models.comments, {foreignKey: "postId"})
    }
  }
  post.init({
    userID: DataTypes.INTEGER,
    numberOfLikes: DataTypes.INTEGER,
    numberOfComments: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts"
  });
  return post;
};