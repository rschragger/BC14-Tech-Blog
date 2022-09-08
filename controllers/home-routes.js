const router = require('express').Router();
const { User, Posts, Comments } = require('../models');
const { withAuth } = require('../utils/auth')


router.get('/', async (req, res) => {
  // Test to check if connection from models to controllers to views all work
  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments }]
  })
    .catch(err => console.log(err));

  const posts = postsData.map((posts) => posts.get({ plain: true }));
  res.render('homepage', {
    posts
  })

});

// router.get('/', async (req, res) => {
//   // Test to check if connection from models to controllers to views all work
//   const userData = await User.findAll({
//   include:[{model:Posts}]
//   })
//     .catch(err => console.log(err));

//   const users = userData.map((user) => user.get({ plain: true }));
//   res.render('homepage', {
//     users
//   })

// });


module.exports = router;


