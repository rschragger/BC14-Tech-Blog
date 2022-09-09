const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const User = require('./User');


class Posts extends Model { }

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [0, 256], //would be larger in real life, but I don't want someone using up my free data
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [0, 1024], //would be larger in real life, but I don't want someone using up my free data
    },
  },
  {
    // {
    //   hooks: {
    //     beforeCreate: async (newUserData) => {
    //       newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //       return newUserData;
    //     },
    //     beforeUpdate: async (updatedUserData) => {
    //       if (updatedUserData.password) {
    //         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //       }
    //       return updatedUserData;
    //     },
    //   },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Posts;
