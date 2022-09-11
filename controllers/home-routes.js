const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth');
const modularUtils = require('../utils/ModularUtils');


router.get('/', async (req, res) => {
// Posts is the basic building block

  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }]
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));

  const loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn,req.session.userId);

  console.log(loggedInUser)

  res.render('homepage',
    {
      posts,
      loggedInUser,
      postsView: true
    })

});

router.get('/login', async (req, res) => {
  // Display the login page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('homepage',
    {
      loginView: true
    })
})

router.get('/signup', async (req, res) => {

  // Display the signup page
  res.render('homepage',
    {
     signupView: true
    });
})


module.exports = router;


