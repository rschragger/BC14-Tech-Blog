
const router = require('express').Router();
const { User, Posts, Comments, CommentsUser } = require('../models');
const { withAuth } = require('../utils/auth')
const modularUtils = require('../utils/ModularUtils')


// Get a post by ID
router.get('/:id', withAuth, async (req, res) => {

  loggedInUser = await modularUtils.getLoggedInUser(req.session.loggedIn, req.session.userId);

  const postsData = await Posts.findAll({
    include: [{ model: User }, { model: Comments, include: [{ model: CommentsUser }] }],
    where: {
      id: req.params.id
    }
  })
    .catch(err => console.log(err));

  const posts = postsData.map((obj) => obj.get({ plain: true }));

  //if the user did not write the post
  if (req.session.userId != posts[0].user_id) {
    res.redirect('/');
    return;
  };

  res.render('homepage',
    {
      loggedInUser,
      posts,
      editPostsView: true
    })

});


module.exports = router;


