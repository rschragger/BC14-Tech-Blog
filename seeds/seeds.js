const sequelize = require('../config/connection');
const { User } = require('../models'); //, Booking

const userSeedData = require('./userSeedData.json');

const randomId = (obj) => {
  return obj[Math.floor(Math.random() * obj.length)].id
}

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  for (const user of userSeedData) {
    /*
     let stallOrOrg = Math.floor(Math.random() * 6); //can be either a stallholder or an organiser seeding
     let shId = (stallOrOrg >= 1) ? randomId(stallholder) : null; // We want 5 times as many stallholders as organisers
     let orgId = (stallOrOrg === 0) ? randomId(location) : null;
     */
    const newUser = await User.create(
      {
        ...user,
        // stallholder_id: shId,
        // location_id: orgId,
        //role_type: !orgId ? 'stallholder' : 'organiser',
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };



  process.exit(0);
};

seedDatabase();