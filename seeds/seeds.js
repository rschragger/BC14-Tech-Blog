const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models'); 

const userSeedData = require('./userSeedData.json');
const postsSeedData = require('./postsSeedData.json');
const commentsSeedData = require('./commentsSeedData.json');

const randomId = (obj) => {
  return obj[Math.floor(Math.random() * obj.length)].id
}

const seedDatabase = async () => { 
  await sequelize.sync({ force: false });

  for (const user of userSeedData) { 
    const newUser = await User.create(
      {
        ...user,
         individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  for (const posts of postsSeedData) { 
    const newPost = await Posts.create(
      {
        ...posts,
         individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  for (const comments of commentsSeedData) { 
    const newComments = await Comments.create(
      {
        ...comments,
         individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };



  process.exit(0);
};

seedDatabase();