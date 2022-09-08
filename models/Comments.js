const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const User = require('./User');


class Comments extends Model { }

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    posts_id: {
      type: DataTypes.INTEGER,
      allowNull: false,// might be a comment on another comment, but still part of a post
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    comments_id: {
      type: DataTypes.INTEGER,
      allowNull: true,//might be a comment on a post
      references: {
        model: 'comments',
        key: 'id',
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [0, 1024], //would be larger in real life, but I don't want someone using up my free data
    },
  },
{

    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;
