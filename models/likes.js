'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likes.belongsTo(models.Post, {foreignKey: "postID"})
      likes.belongsTo(models.User, {foreignKey: "userID"})
    }
  }
  likes.init({
    userID: DataTypes.INTEGER,
    postID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likes',
    tableName: "likes"
  });
  return likes;
};