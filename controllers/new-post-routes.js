
const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth')
const modularUtils = require('../utils/ModularUtils')

router.get('/',withAuth, async (req, res) => {

  loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn,req.session.userId);

  // const postsData = await Posts.findAll({
  //   include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
  //   where:{
  //     id: req.params.id
  //   }
  // })
  //   .catch(err => console.log(err));
  // const posts = postsData.map((obj) => obj.get({ plain: true }));
  
  posts = await modularUtils.getPostsData()
  
  res.render('homepage',
    {
      loggedInUser,
      posts,
      newPostsView: true
    })

});


module.exports = router;


