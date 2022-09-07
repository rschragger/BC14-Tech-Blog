const sequelize = require('../config/connection');
const { User } = require('../models'); 

const userSeedData = require('./userSeedData.json');

const randomId = (obj) => {
  return obj[Math.floor(Math.random() * obj.length)].id
}

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  for (const user of userSeedData) {
  
    
    const newUser = await User.create(
      {
        ...user,
         individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };



  process.exit(0);
};

seedDatabase();