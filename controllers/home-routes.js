const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth');
const modularUtils = require('../utils/ModularUtils');


router.get('/', async (req, res) => {
  // Posts is the basic building block

  /* Made this modular - modularUtils.getPostsData()
   const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
    attributes:{exclude: ["password"]},
  })
    .catch(err => console.log(err));
  const posts = postsData.map((obj) => obj.get({ plain: true }));
*/

  const loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn, req.session.userId);

  const posts = await modularUtils.getPostsData()

  const userPosts = posts.map((obj)=>{
    if(!loggedInUser){return}
    if(obj.user_id===loggedInUser.id){ return obj.id }
  })

  console.log(loggedInUser)

  res.render('homepage',
    {
      posts,
      userPosts,
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


